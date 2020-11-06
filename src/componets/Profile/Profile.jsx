import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import {getProfile, editUser} from '../../services/mypatch-api.service'
import { BiEdit } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
import './Profile.css'


export default function Profile({user, onLogOut, props}) {

    return (
        <div className='profile-flex'>

            <div className='main-pic'>
                {user ? (<Dropdown user={user} onLogOut={onLogOut}/>): ('')}
                <div className='profile-deco'>
                    <h4>{user.name}</h4>
                    <h4>{user.lastName}</h4>
                    <h6>{user.age} years</h6>
                    <img src='https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png' width="130" className="mr-2 rounded-circle" alt={user.name}/>
                    {/* <img src={user.avatar} width="130" className="mr-2 rounded-circle" alt={user.name}/> */}
                </div>
                <div className='edit-btn'>
                    <Link to='/edit/profile'><BiEdit className='edit-profile-size'/></Link>
                </div>
            </div>

            <div className='margin-with-profile-pic'>
                <div className='profile-containers'>
                    <div className='profile-links'>
                        <Link to='/contraceptive'>
                            <h6>My {user.contraceptionMth}</h6>
                        </Link>
                    </div>
                    <div className='profile-links-icons'>
                        <BiChevronRight className='profile-arrow'/>
                    </div>
                </div>
                <div className='profile-containers'>
                    <div className='profile-links'>
                        <Link to='/calendar'>
                            <h6>My calendar</h6>
                        </Link>
                    </div>
                    <div className='profile-links-icons'>
                        <BiChevronRight className='profile-arrow'/>
                    </div>
                </div>
                <div className='profile-containers'>
                    <div className='profile-links'>
                        <Link to='/period/routine'>
                            <h6>My monthly friend</h6>
                        </Link>
                    </div>
                    <div className='profile-link-last-icon'>
                        <BiChevronRight className='profile-arrow'/>
                    </div>
                </div>
            </div>

            <Nav/>

        </div>
    )
}