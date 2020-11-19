import './ReminderList.css'
import React, {useEffect, useState} from 'react'
import {getReminders} from '../../services/mypatch-api.service'
import ReminderCard from '../ReminderCard/ReminderCard'

export default function ReminderList({onLogOut}) {

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

    if (error) {
        return <div>There was an error sending the request</div>
    }

    if (reminderList.length === 0) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="product-list">
                {reminderList.map((reminder) => 
                    <ReminderCard
                        title={reminder.title}
                        description={reminder.description}
                        type={reminder.type}
                        date={reminder.date}
                        id={reminder.id}
                        key={reminder.id}
                    />
                )}
            </div>
        )
    }


}