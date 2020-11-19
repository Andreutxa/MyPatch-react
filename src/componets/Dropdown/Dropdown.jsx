import React from 'react'
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
import './Dropdown.css'
import { FiMenu } from "react-icons/fi";



export default function Dropdown({user, onLogOut}) {

    return (
        <div className="dropdown dropdown-prof-log">
            <Link className="btn dropdown-toggle hide-border-color" to='/profile' role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                <FiMenu className='menu-size'/>
            </Link>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to={'/profile'}>Profile</Link>
                <button className="dropdown-item" onClick={onLogOut}>Logout</button>
            </div>
        </div>
    ) 
}