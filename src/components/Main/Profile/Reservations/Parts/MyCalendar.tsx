import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar, { EventInput, EventClickArg } from '@fullcalendar/react';
import { Container, CircularProgress } from '@material-ui/core';
import { Reservation } from '../../../types';
interface Props {
  ownedReservations: Reservation[];
  supervisedReservations: Reservation[];
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
const MyCalendar: React.FC<Props> = ({ ownedReservations, supervisedReservations }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<EventInput[]>();
  useEffect(() => {
    formatReservations();
  }, []);
  const formatReservations = () => {
    let eventInputReservations: EventInput[] = [];
    ownedReservations.forEach((item) => {
      eventInputReservations.push({ start: new Date(item.start_date), end: new Date(item.end_date), id: item.id, color: 'purple' });
    });
    supervisedReservations.forEach((item) => {
      eventInputReservations.push({ start: new Date(item.start_date), end: new Date(item.end_date), id: item.id, color: 'red' });
    });
    setReservations(eventInputReservations);
    setLoading(false);
  };
  if (loading)
    return (
      <Container maxWidth='xs'>
        <CircularProgress />
      </Container>
    );

  return (
    <Container maxWidth='xl'>
      {' '}
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
          history.push('/rezerwacje/' + event.event.id);
        }}
      />
    </Container>
  );
};
export default MyCalendar;
