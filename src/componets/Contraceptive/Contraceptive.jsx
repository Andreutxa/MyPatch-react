import React, {useState, useEffect} from 'react'
import { createContraceptive, getProfile, getContraceptive } from '../../services/mypatch-api.service'
import {Redirect} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import './Contraceptive.css'


export default function Contraceptive({onLogOut, props}) {
    const[user, setUser] = useState(null)
    const[sortedContraceptive, setSortedContraceptives] = useState([])
    const [redirect, setRedirect] = useState(false);

    const sortContraceptives = (contraceptives) => contraceptives.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    useEffect(() => {
        getProfile()
            .then(user => setUser(user))
            .catch(e => console.log(e))
        getContraceptive()
            .then(contraceptives => {
                setSortedContraceptives(sortContraceptives(contraceptives))
            })
            .catch(e =>  console.log(e))
            
    }, [])

    const calculateDateContraceptive = (date, start) => { 

        const dateParts = date.split("/");

        const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
        
        let newDate = start 
        ? new Date(dateObject.setTime( dateObject.getTime() + 90 * 86400000 ))
        : new Date(dateObject.setTime( dateObject.getTime() + (28 + 4 )* 86400000 ))

        // const finalDate = dateObject.setDate(date.getDate() + 28);
        const day = ('0' + newDate.getDate()).slice(-2) 
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()

        return `${day}/0${month}/${year}`
    }

    const createContracept = () => {
        createContraceptive({
            title: 'Period',
            start_date: calculateDateContraceptive(sortedContraceptive[0].start_date, true)
        })
        .then(contraceptive => {
            setSortedContraceptives((old) => sortContraceptives([...old, contraceptive]))
            setRedirect(true)
        })
        .catch(e => console.log(e))
    }
    if (redirect) {
        return <Redirect to="/calendar" />;
    }

    return (
        <div className='contraceptive-flex'>

            <div className='main-pic-contrc'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='contraceptive-deco'>
                    <h4>{user?.name}'s {user?.contraceptionMth}</h4>
                    <img src='https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png' width="130" className="mr-2 rounded-circle" alt={user ? user.name : 'User pic'}/>
                    {/* <img src={user?.avatar} width="130" className="mr-2 rounded-circle" alt={user ? user.name : 'User pic'}/> */}
                </div>
            </div>

            <div className='contracep-main-info'>
                <div className='contraceptive-pic'>
                    <img src="/images/patch-pic.png" alt="Contraceptive pic"/>
                </div>
                <div className='contraceptive-containers'>
                    <h6>Last "{user?.contraceptionMth} reminder" created : {sortedContraceptive[0]?.start_date}</h6>
                    <button className='create-contr-rem' onClick={() => createContracept()}>
                        Create next one
                    </button>
                </div>
            </div>

            {/* <div style={{overflow: 'scroll', height: '100px', border: '1px solid black'}}>
            
                {sortedContraceptive.map((contraceptive) => {
                    return (
                        <div>
                            <div className='routine-containers'>
                                <h6>Your friend arrived on time</h6>
                                <p>{contraceptive.start_date}</p>
                            </div>
                        </div>
                    )
                })}
            </div> */}


            <Nav/>

        </div>
    )
}