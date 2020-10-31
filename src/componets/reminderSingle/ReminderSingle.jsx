import './reminderSingle.css'
import React, {useState, useEffect} from 'react'
import {deleteRem, editReminder, singleReminder} from '../../services/mypatch-api.service'
import {Link, Redirect} from 'react-router-dom'

export default function ReminderSingle(props) {
    const [rem, setRem] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [body, setBody] = useState(null)
    const remId = props.location.state.id

    // const [user] = useState(props.user) <-- usar en profile
    // const [reviews, setReviews] = useState([])

    useEffect(() => {
        singleReminder(remId)
            .then(response => {
                const {title, description, date, type} = response.reminder
                setRem(response.reminder)
                setBody({ title, description, date, type })
            })
            .catch((e) => console.log(e))
            
    }, [])

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
                    setRem(editedReminder),
                    setShowModal(false)
                    )
            })
            
            .catch((e) => console.log(e))
    }

    const deleteReminder = (e) => {
        e.preventDefault()
        deleteRem(remId)
            .then(() => {
                console.log('Reminder removed')
                return (<Redirect to='/reminders' />)
            })
            .catch((e) => console.log(e))
    }

    const redirectToReminders = (e) => {
            e.preventDefault()
            return <Redirect to='/reminders' />
    }

    return (
        <div>
            <div>{rem.title}</div>
            <div>{rem.description}</div>
            <div>{rem.type}</div>
            <div>{rem.date}</div>
            {/* <div>
                <strong>Score</strong> 
                {reviews.reduce((acc,el) => (acc + parseInt(el.score)) , 0) / reviews.length}
            </div> */}
            {/* <div><img src={rem.image} alt={`${rem.name} pic`} /></div> */}
            <hr />
            {/* <h1>Reviews</h1> */}
            {/* <div className="row">
                {reviews.map(el => (
                    <div className="col-12 col-sm-4">
                        <h3>{el.title}</h3>
                        <p>{el.description}</p>
                        <p><smal>{el.score}</smal></p>
                        <p><strong>posted by</strong> <img src={el.user.image} alt=""/>{el.user.name}</p>
                    </div>
                ))}
            </div> */}
            <hr />


            <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>Edit reminder</button>
            <Link to='/reminders' onClick={deleteReminder, redirectToReminders} className="product-card__single">Delete reminder</Link>

            {showModal && 
            <div className="modal" id="exampleModal" style={{ display: "block"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editing reminder</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea value={body?.description} className="form-control" id="exampleFormControlTextarea1" name="description" rows="3" placeholder={rem.description} onChange={(e) => handleChange(e.target.value, e.target.name)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-price" className="col-form-label">Type</label>
                                    <input value={body?.type} type="text" className="form-control" id="recipient-price" name="type" placeholder={rem.type} onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-image" className="col-form-label">Date</label>
                                    <input value={body?.date} type="text" className="form-control" id="recipient-image" name="date" placeholder={rem.date} onChange={(e) => handleChange(e.target.value, e.target.name)}/>
                                </div>
                               
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} >Close</button>
                                        <button type="submit" className="btn btn-primary" onClick={onSubmit} >Edit reminder</button>
                                    </div>
                               
                               
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
            }
        </div>
    )
}