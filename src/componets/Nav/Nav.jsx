import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'


export default function Nav() {
    return (
        <nav>
            <div>
                <i className="far fa-square"></i>
                <Link to='/home'>Home</Link>
            </div>
            <div>
                <i className="fas fa-calendar-alt"></i>
                <Link to='/calendar'>Calendar</Link>
            </div>
        </nav>
    )
}