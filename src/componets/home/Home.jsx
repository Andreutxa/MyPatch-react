import React from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import Nav from '../Nav/Nav'
import './Home.css'


export default function Home({user, onLogOut}) {
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
                    <p>Date of the patch</p>
                </div>
                <div className='home-containers'>
                    <h6>Your friend arrives at</h6>
                    <p>Date of next period</p>
                </div>
            </div>

            <Nav/>

        </div>
        
    )
}