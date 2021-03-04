import React,{useEffect,useState,useRef} from "react";
import { getData } from '../../../api/index';
import { CircularProgress} from '@material-ui/core';
import { getAccessToken } from '../../../utils/api/accessToken';
import {localizer,messages} from './constants'
import { Calendar,Views  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const WorkshopCalendar = ({id})=>{
    const [loading, setLoading] = useState(true); 
    const [events,setEvents] = useState([])
    const [resources,setResources] = useState([])
    useEffect(()=>{
        getCalendarData()
    },[])
    const getCalendarData = async()=>{
        await getData('workshops/reservations/'+id,getAccessToken())
        .then(response=>{
            let tempEvents =[],tempResources=[];
            response.forEach(machine=>{
                tempResources.push({ resourceId: machine.id, resourceTitle: machine.name });
                machine.Reservations.forEach(reservation=>{
                    tempEvents.push({
                        start: new Date(reservation.start_date),
                        end: new Date(reservation.end_date),
                        id: reservation.id,
                        resourceId:machine.id,
                        title: 'Rezerwacja'
                    })
                })
            })
            setResources(tempResources);
            setEvents(tempEvents);
            setLoading(false)
        })
        .catch(err=>console.log(err));
    }
    if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
    return (
        <div>
            <Calendar
                culture={"pl"}
                localizer={localizer}
                events={events}
                resources={resources}
                step={60}
                defaultDate={new Date()}
                style={{ height: 800 }}
                defaultView='day'
                views={['day', 'work_week']}
                messages={messages}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
            />
        </div>
    )
}

export default WorkshopCalendar