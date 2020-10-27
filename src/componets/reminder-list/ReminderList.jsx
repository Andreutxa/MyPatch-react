import './ReminderList.css'
import React, {useEffect, useState} from 'react'
import {getReminders} from '../../services/mypatch-api.service'
import ReminderCard from '../reminder-card/ReminderCard'

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
            {/* {console.log(reminderList)} */}
                {reminderList.map((reminder) => 
                    <ReminderCard
                        title={reminder.title}
                        description={reminder.description}
                        type={reminder.type}
                        date={reminder.date}
                        id={reminder.id}
                    />
                )}
            </div>
        )
    }


}

// const generateRandomColor = () => Math.floor(Math.random() * 16777215).toString(16)
// export default function reminderList() {

//     const [color, setColor] = useState('black')
//     const [redirect, setRedirect] = useState(false)

//     useEffect(() => {
//         const interval = setInterval(() => setColor(`#${generateRandomColor()}`), 1000)
//         const timeout = setTimeout(() => setRedirect(true), 5000)

//         return () => {
//             clearInterval(interval)
//             clearInterval(timeout)
//         }
//     }, [])

//     if (redirect) {
//         return <Redirect to='/login' />
//     }

//     return (
//         <p style={{color: color}}>Andrés</p>
//     )
// }


// export default function EffectsExample(props) {

//     const [state, setState] = useState()

//     useEffect(() => {})
//     useEffect(() => {}, [])
//     useEffect(() => {}, [props.prop1, state])

//     return (
//         <div></div>
//     )
// }