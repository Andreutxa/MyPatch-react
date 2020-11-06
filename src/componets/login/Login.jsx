import './Login.css'
import React, {useState} from 'react'
import InputWithLabel from '../input-with-label/InputWithLabel'
import {login} from '../../services/mypatch-api.service'
import {Link, Redirect} from 'react-router-dom'

export default function Login({user, onLogIn}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()
        login(email, password)
            .then(loggedInUser => onLogIn(loggedInUser))
            .catch(e => setError('There was an error with the credentials'))
    }

    if (user) {
        return <Redirect to='/home' />
    }

    return (
        <div>
            <div className="login">
                {error && <p><strong>Oops</strong> {error}</p>}
                <div className='login-logo-pic'>
                    <img src="/images/mypatch-logo.png" alt="MyPatch logo"/>
                </div>
                <div>
                    <form onSubmit={onSubmit} className='login-form-container'>
                        <InputWithLabel
                            value={email}
                            label="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)} />

                        <InputWithLabel
                            value={password}
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)} />

                        <div className='register-link'>
                            <p>Don't have an account? <Link to='/register'>Register here</Link></p>
                        </div>
                        <button className='login-btn' type="submit">Log In</button>
                    </form>
                </div>
        
            </div>
        </div>
    )
}