/*global socket*/

import React, { Component } from 'react'
import { Link } from 'react-router'
import socket from '../socket'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      instrument: null
    }
  }

  nameChangeHandler(e) {
    this.setState({ name: e.target.value })
  }

  instrumentChangeHandler(e) {
    this.setState({ instrument: e.target.value })
  }

  loginHandler() {
    console.log('sending request to update user')
    socket.emit('updateUser', {
      name: this.state.name,
      instrument: this.state.instrument,
    })
  }

  render() {
    return (
      <div className='login'>
        <h2>What's your name?</h2>
        <input className='nameInput' type='text' onChange={this.nameChangeHandler.bind(this)}></input>
        <form onChange={this.instrumentChangeHandler.bind(this)} >
          <h2>What instrument are you playing?</h2>
          <input type='radio' name='instrument' value='lead'/>Lead<br/>
          <input type='radio' name='instrument' value='rhythm'/>Rhythm<br/>
          <input type='radio' name='instrument' value='percussion'/>Percussion<br/>
        </form>
        {this.state.name && this.state.instrument &&
          <Link to='/rooms'><button className='btn btn-login' onClick={this.loginHandler.bind(this)}>Let's find a room!</button></Link>
        }
      </div>
    )
  }
}

export default Login
