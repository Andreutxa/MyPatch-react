import React from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import './Contraceptive.css'


export default function Contraceptive({user, onLogOut, props}) {

    return (
        <div className='contraceptive-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='contraceptive-deco'>
                    <h4>{user.name}'s {user.contraceptionMth}</h4>
                    <img src={user.avatar} width="130" className="mr-2 rounded-circle" alt={user.name}/>
                </div>
            </div>

            <div>
                <div className='contraceptive-pic'>
                    <img src="/images/patch-pic.png" alt="Contraceptive pic"/>
                </div>
                <div className='contraceptive-containers'>
                    <h6>X days remain for next reminder</h6>
                    <p>Next reminder: reminder?</p>
                </div>
            </div>

            <Nav/>

        </div>
    )
}