import React, {useState, useEffect} from 'react'
// import {Link} from 'react-router-dom'
import { createPeriods, getProfile, getPeriods } from '../../services/mypatch-api.service'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import './PeriodRoutine.css'


export default function PeriodRoutine({ onLogOut, props}) {

    const[user, setUser] = useState(null)
    const[sortedPeriods, setSortedPeriods] = useState([])
    const [currentPeriods, setCurrentPeriods] = useState([])

    const sortPeriods = (periods) => periods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    useEffect(() => {
        getProfile()
            .then(user => setUser(user))
            .catch(e => console.log(e))
        getPeriods()
            .then(periods => {
                setSortedPeriods(sortPeriods(periods))
            })
            .catch(e =>  console.log(e))
            
    }, [])

    const calculateDatePeriod = (date, start) => { 

        const dateParts = date.split("/");

        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
        
        var newDate = start 
        ? new Date(dateObject.setTime( dateObject.getTime() + 28 * 86400000 ))
        : new Date(dateObject.setTime( dateObject.getTime() + (28 + 4 )* 86400000 ))

        // const finalDate = dateObject.setDate(date.getDate() + 28);
        const day = ('0' + newDate.getDate()).slice(-2) 
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()

        return `${day}/0${month}/${year}`
    }

    const createPeriod = () => {
        createPeriods({
            title: 'Period',
            start_date: calculateDatePeriod(sortedPeriods[0].start_date, true),
            end_date: calculateDatePeriod(sortedPeriods[0].start_date, false),
        })
        .then(period => setSortedPeriods((old) => sortPeriods([...old, period])))
        .catch(e => console.log(e))
    }
    return (
        <div className='routine-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='profile-deco'>
                    <h4>YOUR FRIEND'S ROUTINE</h4>
                </div>
                <div className='routine-img-size'>
                    <img src="/images/lateArrival.png" alt="Routine pic"/>
                </div>
            </div>

            <div className='contraceptive-create-containers'>
                <h6>Last "Period reminder" created : {sortedPeriods[0]?.start_date}</h6>
                <button className='create-period-rem' onClick={() => createPeriod()}>
                    Create next one
                </button>
            </div>

            <div>
                <h4>Period record</h4>      
            </div>  
            
            {/* <button onClick={() => createPeriod()}>
                your last period was on {sortedPeriods[0]?.start_date}, add nex one?
            </button> */}
            <div style={{overflow: 'scroll', height: '200px'}}>
                    
                {sortedPeriods.map((period) => {
                    return (
                        <div>   
                            <div className='routine-containers'>
                                {/* <h6>Your friend arrived on time</h6> */}
                                <h5>{period.start_date}</h5>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Nav/>

        </div>
    )
}