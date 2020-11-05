import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getContraceptive, getPeriods } from '../../services/mypatch-api.service'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import './Home.css'


export default function Home({user, onLogOut}) {
    const[sortedContraceptive, setSortedContraceptives] = useState([])
    const[sortedPeriods, setSortedPeriods] = useState([])

    const sortContracepPeriod = (contrPer) => contrPer.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    useEffect(() => {
        getContraceptive()
            .then(contraceptives => {
                setSortedContraceptives(sortContracepPeriod(contraceptives))
            })
            .catch(e =>  console.log(e))
        getPeriods()
            .then(periods => {
                setSortedPeriods(sortContracepPeriod(periods))
            })
            .catch(e =>  console.log(e))
            
    }, [])

    return (
        <div className='home-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='home-deco'>
                    <h4>MY PATCH</h4>
                    <img src="/images/routine.png" alt="Home pic"/>
                </div>
            </div>

            <div>
                <div className='home-containers'>
                    <h6>Next patch</h6>
                    <p>{sortedContraceptive[0]?.start_date}</p>
                </div>
                <div className='home-containers'>
                    <h6>Your friend arrives at</h6>
                    <p>{sortedPeriods[0]?.start_date}</p>
                </div>
            </div>

            <Nav/>

        </div>
        
    )
}