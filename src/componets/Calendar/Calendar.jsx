import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import {getReminders, createReminder} from '../../services/mypatch-api.service'
import interactionPlugin from "@fullcalendar/interaction";
import './Calendar.css'


export default function Calendar({user, onLogOut, events}) {

    const handleDateClick = (arg) => { 
        // alert(arg.dateStr)
        return (
            alert(arg.dateStr)
        )
        //cuando le des click, que salgan los botones de añadir reminder o cambiar patch por ejemplo
    }

    return (
        <div className="product-list">
            <FullCalendar
                className='calendar-size'
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                weekends={true}
                dateClick={handleDateClick}
                editable={true}
                events={events}
            />
        </div>
    )
    
}