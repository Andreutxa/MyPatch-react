import React from 'react'
import {Link} from 'react-router-dom'
import './reminderCard.css'

export default function ReminderCard({title, description, type, date, id}) {
    return (
        <div className="product-card">
            {/* <div className="product-card__image" style={{background: `url(${image}) no-repeat center center / cover`}}></div> */}
            <h4>{title}</h4>
            {/* <div className="product-card__price">{description}</div> */}
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