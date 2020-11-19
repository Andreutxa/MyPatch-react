import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter as Router} from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import './index.css'

ReactDOM.render(
  
    <Router>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
    </Router>
,
  document.getElementById('root')
)

serviceWorker.unregister()
