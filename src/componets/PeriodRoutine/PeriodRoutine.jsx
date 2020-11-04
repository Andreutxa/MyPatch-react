import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
// import {getProfile, editUser} from '../../services/mypatch-api.service'
import './PeriodRoutine.css'


export default function PeriodRoutine({user, onLogOut, props}) {

    // const [routine, setRoutine] = useState([])

    // useEffect(() => {
    //     const newRoutine = routine.push(user.period)
    //     setRoutine(newRoutine)
    // }, [routine, user.period])

    const routine = []

    const newRoutine = routine.push(user.period)

    console.log(newRoutine);

    return (
        <div className='routine-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='profile-deco'>
                    <h4>YOUR FRIEND'S ROUTINE</h4>
                </div>
            </div>

            <div style={{overflow: 'scroll', height: '200px'}}>
                {routine.map((day) => {
                    return (
                        <div className='routine-containers'>
                            <h6>Your friend arrived on time</h6>
                            <p>{day}</p>
                        </div>
                    )
                })}
            </div>

            <Nav/>

        </div>
    )
}