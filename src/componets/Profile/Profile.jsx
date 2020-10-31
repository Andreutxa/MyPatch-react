import React from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import {getProfile} from '../../services/mypatch-api.service'
import './Profile.css'


export default function Profile({user, onLogOut, props}) {

    // getProfile(user.id)
    console.log(user.avatar);
    return (
        <div className='profile-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='profile-deco'>
                    <h4>{user.name}</h4>
                    <h4>{user.lastName}</h4>
                    <h6>{user.age} years</h6>
                    <img src={user.avatar} width="130" className="mr-2 rounded-circle" alt={user.name}/>
                </div>
            </div>

            <div>
                <div className='profile-containers'>
                    <Link to='/contrateptive'>
                        <h6>My {user.contraceptionMth}</h6>
                    </Link>
                </div>
                <div className='profile-containers'>
                    <Link to='/calendar'>
                        <h6>My calendar</h6>
                    </Link>
                </div>
                <div className='profile-containers'>
                    <Link to='/period'>
                        <h6>My monthly friend</h6>
                    </Link>
                </div>
            </div>

            <Nav/>

        </div>
    )
}