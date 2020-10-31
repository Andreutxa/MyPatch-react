import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Calendar from 'react-calendar';
import './Calendar.css'


export default function Calendar({user, onLogOut, props}) {
    const [date, setDate] = useState(new Date())

    cosnt onChange = date => {
        setDate(date)
    }

    return (
        <div>
            <Calendar onChange={onChange} value={date}/>
        </div>
    )
}