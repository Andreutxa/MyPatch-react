import './ReminderSingle.css'
import React, {useState, useEffect} from 'react'
import {deleteRem, editReminder} from '../../services/mypatch-api.service'
import {Redirect} from 'react-router-dom'
import { BiCalendarEdit, BiCalendarX } from 'react-icons/bi';

export default function ReminderSingle(props) {
    const [rem, setRem] = useState([])
    const [body, setBody] = useState({title: props.title, date: props.date})
    const [showModal, setShowModal] = useState(false)
    const remId = props.id
    console.log(showModal)
    const [redirect, setRedirect] = useState(false)

    const handleChange = (val, name) => {
        setBody({
            ...body,
            [name]: val
        })
    }

    const onSubmit = (e) => {
       
        e.preventDefault()

        console.log('body', body)
        editReminder(remId, body)
            .then(editedReminder => {
                console.log('Reminder edited', editedReminder)
                return (
                    props.setReminderList((old) => {
            
                        const newRemList = old.map(e => e.id === editedReminder.id ? editedReminder : e)
                        console.log(newRemList)
                        return [...newRemList]
                    }),
                    setShowModal(false)
                )
            })
            
            .catch((e) => console.log(e))
    }

    const deleteReminder = () => {
        
        deleteRem(remId)
            .then((deletedReminder) => {
                console.log('Reminder removed', deletedReminder)
                props.setReminderList((old) => {
                    const newList = old.filter(e => e.id !== deletedReminder.id)
                    console.log('new list', newList)
                    return [...newList]
                })
            })
            .catch((e) => console.log(e))
    }

    if (redirect) {
        return <Redirect to='/calendar' />
    }

    return (
        <div>
            <div className='all-reminders-flex' key={remId}>
                <div className='reminder-title'>
                    <h5>{props.title}</h5>
                </div>
                <div className='reminder-props'>
                    <p>{props.originalFormatDate}</p>
                </div>
                <div className='test5'>
                    <div>
                        <button type="button" onClick={() => setShowModal(true)} className='edit-rem-btn'><BiCalendarEdit className='edit-icon-size'/></button>
                    </div>
                    <div>
                        <button onClick={() => deleteReminder()} className='delete-rem-btn'><BiCalendarX className='delete-icon-size'/></button>
                    </div>
                </div>

            </div>

            {showModal && 
            <div className="modal edit-animation" id="myeditingmodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Editing reminder</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Title</label>
                                    <input value={body?.title} type="text" className="form-control" id="recipient-name" name="title" placeholder={rem.title} onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-image" className="col-form-label">Date</label>
                                    <input value={body?.date} type="text" className="form-control" id="recipient-image" name="date" placeholder={rem.date} onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" onClick={() => setShowModal(false)}>Close</button>
                            <button type="submit" className="btn" onClick={onSubmit} >Edit reminder</button>
                        </div>
                    </div>
                </div> 
            </div>
            }
        </div>
    )
}