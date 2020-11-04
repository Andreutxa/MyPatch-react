import React, { useState, useEffect } from 'react'
// import TheCalendar from 'react-calendar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {getReminders, createReminder} from '../../services/mypatch-api.service'
import interactionPlugin from "@fullcalendar/interaction";
import './Calendar.css'


export default function Calendar({user, onLogOut, events}) {
    const [reminderList, setReminderList] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        getReminders()
            .then(reminders => setReminderList(reminders))
            .catch((e) => {
                if (e.response.status === 401) {
                    onLogOut()
                } else {
                    setError(true)
                }
             })
    }, [])


    const formatedDate = (date) => {
        return date.split('/').reverse().join('-')
    }
    
    const formattedList = reminderList.reduce((acc, e) => {
        acc.push({ title: e.title, date : formatedDate(e.date) })
        return acc
    }, [])


    const handleDateClick = (arg) => { 
        // alert(arg.dateStr)
        return (
            alert(arg.dateStr)
        )
        //cuando le des click, que salgan los botones de añadir reminder o cambiar patch por ejemplo
    }

    if (reminderList.length === 0) {
        return <div>Loading...</div>
    } else {
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
}