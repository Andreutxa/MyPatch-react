import './reminderSingle.css'
import React, {useState, useEffect} from 'react'
import {deleteRem, editReminder, singleReminder} from '../../services/mypatch-api.service'
import {Link, Redirect} from 'react-router-dom'

export default function ReminderSingle(props) {
    const [rem, setRem] = useState([])
    const [user] = useState(props.user)
    const remId = props.location.state.id
    // const [reviews, setReviews] = useState([])

    useEffect(() => {
        singleReminder(remId)
            .then(response => {
                setRem(response.reminder)
                // setReviews(reminder.prod.reviews)
            })
            .catch((e) => console.log(e))
    }, [])

    const onSubmit = (e) => {
        console.log('clicked')
        e.preventDefault()
        editReminder(remId)
            .then(editedReminder => setRem(editedReminder))
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

    return (
        <>
            <div>Hellooooooo</div>
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


            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit reminder</button>
            <Link onClick={deleteReminder} className="product-card__single">Delete reminder</Link>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" className="form-control" id="recipient-name" name="name" placeholder={rem.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder={rem.description}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-price" className="col-form-label">Type</label>
                                    <input type="text" className="form-control" id="recipient-price" name="price" placeholder={rem.type} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-image" className="col-form-label">Date</label>
                                    <input type="text" className="form-control" id="recipient-image" name="image" placeholder={rem.date} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Edit reminder</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}