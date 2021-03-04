import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Container, CircularProgress } from '@material-ui/core';
import { Calendar  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {messages,localizer} from './constants'

const ProfileCalendar = ({ ownedReservations, supervisedReservations })=>{
    const history = useHistory();
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        formatReservations();
      }, []);
    const formatReservations = ()=>{
        let eventInputReservations = [];
        ownedReservations.forEach((item) => {
          eventInputReservations.push({ start: new Date(item.start_date), end: new Date(item.end_date), id: item.id, title:'Własna'  });
        });
        supervisedReservations.forEach((item) => {
          eventInputReservations.push({ start: new Date(item.start_date), end: new Date(item.end_date), id: item.id, title:'Nadzorowana' });
        });
        setReservations(eventInputReservations)
    }
    return (<Container maxWidth='xl'>
         <Calendar
          popup
          culture={"pl"}
          localizer={localizer}
          events={reservations}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          views={['month', 'agenda']}
          defaultView='month'
          messages={messages}
          onSelectEvent={(event,e)=>{
              console.log(event)
              history.push('/rezerwacje/' + event.id);
          }}
    />
    </Container>)
}
export default ProfileCalendar;