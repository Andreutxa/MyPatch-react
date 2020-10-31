import React, {useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticateRoute from './componets/AuthenticateRoute/AuthenticateRoute'
// import Header from './componets/header/Header'
import Home from './componets/home/Home'
import Login from './componets/login/Login'
import Profile from './componets/Profile/Profile'
import Contraceptive from './componets/Contraceptive/Contraceptive'
import ReminderList from './componets/reminder-list/ReminderList'
import ReminderSingle from './componets/reminderSingle/ReminderSingle'
import CalendarView from './componets/Calendar/CalendarView'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const onLogIn = (loggedInUser) => {
    //GUARDAR USUARIO EN COOKIE
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  const onLogOut = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  //PARA ENRUTAR USUARIOS CON ROL
  // if (user) {
  //   return <Redirect to='/home' />
  // }

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
            path='/contraceptive' 
            render={(props) => <Contraceptive {...props} user={user} onLogOut={onLogOut} />} 
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
