import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, CircularProgress, Typography, TextField, Paper } from '@material-ui/core';
import { getData,putData } from '../../../api/index';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '../../../utils/api/accessToken';
import { useAlertContext, AlertType } from '../../../context/AlertContext';
import MyDateTimePicker from '../Inputs/MyDateTimePicker';
import { ReservationSchema } from '../../Main/schemas';
import { Formik, Form, Field } from 'formik';
import {dateRangeOverlaps,calculateEndDate} from './helpers'
import useStyles from '../styles';


const UpdateResCalendar = ({ id, isMachineActive, maxUnit, timeUnit, startDate, endDate, machineId, state }) => {
  const classes = useStyles();
  const history = useHistory();
  const alertContext = useAlertContext();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState();
  useEffect(() => {
    getReservations();
  }, []);
  const getReservations = async () => {
    const response = await getData('machines/rent/' + machineId, getAccessToken());
    let tempReservations = [];
    tempReservations.push({
      start: new Date(startDate),
      end: new Date(endDate),
      id: id,
      title: `Stan mojej rezerwacji: ${state}`
    });
    response.map((item) => {
      if (item.id !== id) {
        tempReservations.push({
          start: new Date(item.start_date),
          end: new Date(item.end_date),
          id: item.id,
          title: item.Employee.User.lastName + ' ' + item.Employee.User.firstName
        });
      }
    });
    setReservations(tempReservations);
    setLoading(false);
  };
  const checkDates = (data) => {
    let statusMessage = '';
        data.end_date = calculateEndDate(data.unitCount, data.start_date,timeUnit);
        let reservationsArrayLength = reservations.length;
        for(let i=0;i<reservationsArrayLength;i++){
          if(reservations[i].id !== id ) statusMessage=dateRangeOverlaps(new Date(data.start_date), new Date(data.end_date),new Date(reservations[i].start),new Date(reservations[i].end));
          if(statusMessage!=='') {
            return statusMessage
          }
        }
        return statusMessage;
  };
  const updateReservation = async (data) => {
    data.machineId = machineId;
    await putData('rental/' + id, getAccessToken(), { start_date: data.start_date, end_date: data.end_date, machineId: data.machineId })
      .then((res) => {
        alertContext.openAlert(AlertType.success, 'Pomyślnie wysłano prośbę o rezerwację!');
        history.push('/moje_konto/rezerwacje');
      })
      .catch((err) => {
        alertContext.openAlert(AlertType.error, 'Wystąpił problem. Prosimy spróbować później.');
      });
    await getReservations();
  };
  const calcTimeUnits = () => {
    const endMinutes = new Date(endDate).getTime() / 60000;
    const startMinutes = new Date(startDate).getTime() / 60000;
    let minutes = endMinutes - startMinutes;
    return minutes / +timeUnit;
  };
  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  return (
    <Container maxWidth='lg'>
      <Paper className='rent-form'>
        <Typography variant='h5'>Edytuj swoją rezerwację</Typography>
        <Formik
          validateOnChange={true}
          validationSchema={ReservationSchema}
          initialValues={{ start_date: new Date(startDate), unitCount: calcTimeUnits() }}
          onSubmit={(data, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            let errorMessage = checkDates(data);
              errorMessage!==''?setErrors({ start_date: errorMessage, unitCount: '' }):updateReservation(data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
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
                Edytuj Rezerwację
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
        
    </Container>
  );
};

export default UpdateResCalendar;
