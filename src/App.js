import React, {useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticateRoute from './componets/AuthenticateRoute/AuthenticateRoute'
import Home from './componets/home/Home'
import Login from './componets/login/Login'
import Profile from './componets/Profile/Profile'
import Contraceptive from './componets/Contraceptive/Contraceptive'
import ReminderList from './componets/ReminderList/ReminderList'
import ReminderSingle from './componets/ReminderSingle/ReminderSingle'
import CalendarView from './componets/Calendar/CalendarView'
import EditProfile from './componets/Profile/EditProfile/EditProfile'
import PeriodRoutine from './componets/PeriodRoutine/PeriodRoutine'
import './App.css'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const onLogIn = (loggedInUser) => {
    //GUARDAR USUARIO EN COOKIE
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser({...loggedInUser})
  }

  const onLogOut = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  return (

    <div className="App">

        <Switch>

          <Route
            path='/login'
            render={(props) => <Login {...props} user={user} onLogIn={onLogIn} />}
          />
          <Route 
            path='/home' 
            render={(props) => <Home {...props} user={user} onLogOut={onLogOut} />} 
          />
          <Route 
            path='/profile' 
            render={(props) => <Profile {...props} user={user} onLogOut={onLogOut} />} 
          />
          <Route 
            path='/edit/profile' 
            render={(props) => <EditProfile {...props} user={user} onLogOut={onLogOut} onLogIn={onLogIn} />} 
          />
          <Route 
            path='/contraceptive' 
            render={(props) => <Contraceptive {...props} user={user} onLogOut={onLogOut} />} 
          />
          <Route 
            path='/period/routine' 
            render={(props) => <PeriodRoutine {...props} user={user} onLogOut={onLogOut} />} 
          />
          <Route 
            path='/calendar' 
            render={(props) => <CalendarView {...props} user={user} onLogOut={onLogOut} />}
          />
          <AuthenticateRoute
            path='/reminders'
            render={(props) => <ReminderList {...props} user={user} onLogOut={onLogOut} />}
            user={user}
          />
          <Route 
            path='/reminder/:id' 
            render={(props) => <ReminderSingle {...props} user={user} onLogOut={onLogOut} />} 
          />
          <Redirect to='/reminders' />
          
        </Switch>
    </div>
  )
}

export default App
