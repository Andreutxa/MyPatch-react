import React from 'react'
import Calendar from 'react-calendar'
import {Link} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import './CalendarView.css'


export default function CalendarView({user, onLogOut}) {

    return (
        <div className='calendar-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='calendar-deco'>
                    <h4>Calendar</h4>
                    <img src='' alt='Calendar pic'/>
                </div>
            </div>

            <div className='calendar-position'>
                <Calendar/>
            </div>

            <div className='calendar-btn'>
                <button>Change {user.contraceptionMth}</button>
            </div>
            <div className='calendar-link'>
                <Link to='/period/incidence'>Troubles with my friend</Link>
            </div>

            <Nav/>

        </div>
    )
}