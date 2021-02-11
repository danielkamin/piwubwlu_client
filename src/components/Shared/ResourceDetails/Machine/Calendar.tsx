import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import FullCalendar, { EventInput, EventClickArg } from '@fullcalendar/react';
import { getData, postData } from '../../../../api/index';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Container, CircularProgress, Typography, TextField, Tooltip, Paper } from '@material-ui/core';
import { useUserContext } from '../../../../context/UserContext';
import { getAccessToken } from '../../../../utils/api/accessToken';
import { useAlertContext, AlertType } from '../../../../context/AlertContext';
import MyDateTimePicker from '../../Inputs/MyDateTimePicker';
import { Roles } from '../../../../utils/constants';
import { ReservationSchema } from '../../schemas';
import { Formik, Form, Field } from 'formik';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import useStyles from '../../styles';
interface Props {
  id: string;
  isMachineActive: boolean | undefined;
  maxUnit: number | undefined;
  timeUnit: string;
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <br></br>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
const Calendar: React.FC<Props> = ({ id, isMachineActive, maxUnit, timeUnit }) => {
  const classes = useStyles();
  const history = useHistory();
  const alertContext = useAlertContext();
  const context = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<EventInput[]>();
  useEffect(() => {
    getReservations();
  }, []);
  const getReservations = async () => {
    const response = await getData('machines/rent/' + id, getAccessToken());
    let tempReservations: EventInput[] = response.map((item: any) => {
      return {
        start: new Date(item.start_date),
        end: new Date(item.end_date),
        id: item.id,
        title: item.Employee.User.lastName + ' ' + item.Employee.User.firstName
      };
    });
    setReservations(tempReservations);
    setLoading(false);
  };
  const newReservation = async (data: any) => {
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
  const checkDates = (data: any): boolean => {
    let status = true;
    data.end_date = calcEndDate(data.unitCount, data.start_date);
    reservations?.forEach((item: any) => {
      if (areIntervalsOverlapping({ start: data.start_date, end: data.end_date }, { start: item.start, end: item.end }) === true) {
        status = false;
      }
    });
    return status;
  };
  const calcEndDate = (units: number, start_date: Date) => {
    let tmpTimeUnit: number = +timeUnit;
    let minutes = units * tmpTimeUnit;
    return new Date(start_date.getTime() + 60000 * minutes);
  };

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth='xl'>
      {context?.roles?.indexOf(Roles.employee) !== -1 && (
        <Paper className='rent-form'>
          <Typography variant='h5'>Zarezerwuj Maszynę</Typography>
          <Formik
            validateOnChange={true}
            validationSchema={ReservationSchema}
            initialValues={{ start_date: new Date(), unitCount: 0 }}
            onSubmit={(data, { setSubmitting, setErrors }) => {
              setSubmitting(true);
              //sprawdzenie górnego limutu uczelnianego
              if (checkDates(data) === false) {
                setErrors({ start_date: 'W tym czasie maszyna jest zajęta', unitCount: 'W tym czasie maszyna jest zajęta' });
              } else newReservation(data);
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
        </Paper>
      )}
      <FullCalendar
        allDaySlot={false}
        locale='pl'
        plugins={[dayGridPlugin, timeGridPlugin]}
        eventContent={renderEventContent}
        initialView='timeGridWeek'
        weekends={true}
        buttonText={{ today: 'Dzisiaj' }}
        events={reservations}
        slotMinTime='07:15:00'
        slotMaxTime='21:15:00'
        expandRows={true}
        eventClick={(event: EventClickArg) => {
          console.log(event);
          history.push('/rezerwacje/' + event.event.id);
        }}
      />
    </Container>
  );
};
export default Calendar;
