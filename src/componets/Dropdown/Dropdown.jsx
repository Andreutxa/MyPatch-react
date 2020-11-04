import React from 'react'
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon';
// import {getProfile} from '../../services/mypatch-api.service'
import './Dropdown.css'


export default function Dropdown({user, onLogOut}) {
    
    // const id = user.id
    // const [userInfo, setUserInfo] = useState()
    // const [error, setError] = useState()

 
    //     // getProfile(id)
    //     //     .then(user => setUserInfo(user))
    //     //     .catch((e) => {
    //     //         if (e.response.status === 401) {
    //     //             onLogOut()
    //     //         } else {
    //     //             setError(true)
    //     //         }
    //     //      })

    // console.log(userInfo);

    return (
        <div className="dropdown dropdown-prof-log">
            <Link className="btn dropdown-toggle" to='/profile' role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                <Icon className="fa fa-plus-circle" />
            </Link>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link className="dropdown-item" to={'/profile'}>Profile</Link>
                <button className="dropdown-item" onClick={onLogOut}>Logout</button>
            </div>
        </div>
    ) 
}