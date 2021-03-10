import React,{useEffect,useState,useRef} from "react";
import { getData,postData } from '../../../api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../utils/api/accessToken';
import { Calendar  } from 'react-big-calendar'
import { Formik, Form, Field } from 'formik';
import { useAlertContext, AlertType } from '../../../context/AlertContext';
import MyDateTimePicker from '../Inputs/MyDateTimePicker';
import { Roles } from '../../../utils/constants';
import { ReservationSchema } from '../../Main/schemas';
import { Button, Container, CircularProgress, Typography, TextField, Paper } from '@material-ui/core';
import useStyles from '../styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {messages,localizer} from './constants'
import {dateRangeOverlaps,calculateEndDate} from './helpers'

const MachineCalendar = ({isMachineActive,maxUnit,id,timeUnit,roles})=>{
    const history = useHistory();
    const classes = useStyles();
    const formRef = useRef(null);
    const alertContext = useAlertContext();
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        getReservations();
      }, []);
      const getReservations = async () => {
        const response = await getData('machines/rent/' + id, getAccessToken());
        let tempReservations = response.map((item) => {
            return {
              start: new Date(item.start_date),
              end: new Date(item.end_date),
              id: item.id,
              title: item.Employee.User.lastName + ' ' + item.Employee.User.firstName
            };
          });
        setReservations(tempReservations);
        setLoading(false);
      }
      const newReservation = async (data) => {
        data.machineId = id;
        await postData('rental/', getAccessToken(), { start_date: data.start_date, end_date: data.end_date, machineId: data.machineId })
          .then((res) => {
            alertContext.openAlert(AlertType.success, 'Pomyślnie wysłano prośbę o rezerwację!');
            history.push('/moje_konto/rezerwacje');
          })
          .catch((err) => {
            alertContext.openAlert(AlertType.error, 'Wystąpił problem. Prosimy spróbować później.');
          });
        await getReservations();
      };
      const checkDates = (data) => {
        let statusMessage = '';
        data.end_date = calculateEndDate(data.unitCount, data.start_date,timeUnit);
        let reservationsArrayLength = reservations.length;
        for(let i=0;i<reservationsArrayLength;i++){
          statusMessage=dateRangeOverlaps(new Date(data.start_date), new Date(data.end_date),new Date(reservations[i].start),new Date(reservations[i].end));
          if(statusMessage!=='') {
            return statusMessage
          }
        }
        return statusMessage;
      };
      if (loading)
      return (
        <div>
          <CircularProgress />
        </div>
      );

    return (<Container maxWidth='xl'>
      {roles.indexOf(Roles.employee) !== -1 && (
        <div className="rent-form">
          <Typography variant='h5'>Zarezerwuj Maszynę</Typography>
          <Formik
            validateOnChange={true}
            validationSchema={ReservationSchema}
            initialValues={{ start_date: new Date(), unitCount: 0 }}
            onSubmit={(data, { setSubmitting, setErrors }) => {
              setSubmitting(true);
              let errorMessage = checkDates(data);
              errorMessage!==''?setErrors({ start_date: errorMessage, unitCount: '' }):newReservation(data);
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting, errors }) => (
              <Form ref={formRef} className={classes.rentForm}>
                <MyDateTimePicker name='start_date' id='start-date' disabled={!isMachineActive} />
                <Typography variant='body1'>
                  Jednostka czasu: <b>{timeUnit} min</b> - Max ilość jednostek: <b>{maxUnit}</b>
                </Typography>
                <Field
                  name='unitCount'
                  as={TextField}
                  type='number'
                  InputProps={{ inputProps: { min: 1, max: maxUnit, name: 'unitCount' } }}
                  placeholder='Liczba jednostek'
                  className={classes.wideSelect}
                />
                {/* <MyDateTimePicker name='end_date' id='end-date' disabled /> */}
                <Button type='submit' variant='contained' color='secondary' disabled={isSubmitting || !isMachineActive}>
                  Rezerwuj
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    <Calendar
    culture={"pl"}
      localizer={localizer}
      events={reservations}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 800 }}
      defaultView='week'
        messages={messages}
        onSelectEvent={(event,e)=>{
            console.log(event)
            history.push('/rezerwacje/' + event.id);
        }}
    />
  </Container>);
    
}
export default MachineCalendar;