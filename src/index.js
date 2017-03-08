import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import Studio from './components/Studio'
import Login from './components/Login'
import Rooms from './components/Rooms'
import './App.css'
import socket from './socket'

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path='/' component={Login} />
      <Route path='/rooms' component={Rooms} />
      <Route path='/studio/:id' component={Studio} />
  </Router>,
  document.getElementById('root')
)
