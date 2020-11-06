import React from 'react'
import {Link} from 'react-router-dom'
import { BiHome } from 'react-icons/bi';
import { BiCalendar } from 'react-icons/bi';
import './Nav.css'


export default function Nav() {
    return (
        <nav>
            <div className='nav-flex'>
                <div>
                    <Link to='/home'><BiHome className='nav-icons'/></Link>
                </div>
                <div>
                    <Link to='/home'>Home</Link>
                </div>
            </div>
            <div className='nav-flex'>
                <div>
                    <Link to='/calendar'><BiCalendar className='nav-icons'/></Link>
                </div>
                <div>
                    <Link to='/calendar'>Calendar</Link>
                </div>
            </div>
        </nav>
    )
}