import React from 'react'
import {Link} from 'react-router-dom'
import './reminderCard.css'

export default function ReminderCard({title, description, type, date, id}) {
    return (
        <div className="product-card">
            <h4>{title}</h4>
            <p>{type}</p>
            <p>{date}</p>
            <Link to={{
                pathname: `/reminder/${id}`,
                state: {
                    id
                }
            }} className="product-card__single">View detail</Link>
            <hr />
        </div>
    )
}