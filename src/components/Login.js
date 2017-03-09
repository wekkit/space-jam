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
    socket.emit('updateUser', {
      name: this.state.name,
      instrument: this.state.instrument,
    })
  }

  render() {
    return (
      <div className='login'>
        <h2>What's your name?</h2>
        <input
          className='text-input'
          type='text'
          onChange={this.nameChangeHandler.bind(this)}
          placeholder='e.g. Chet Faker'
        />
        <form onChange={this.instrumentChangeHandler.bind(this)} >
          <h2>What instrument are you playing?</h2>
          <div className='option-text'><input type='radio' name='instrument' value='lead'/> Lead</div><br/>
          <div className='option-text'><input type='radio' name='instrument' value='rhythm'/> Rhythm</div><br/>
          <div className='option-text'><input type='radio' name='instrument' value='percussion'/> Percussion</div><br/>
        </form>
        {this.state.name && this.state.instrument &&
          <Link to='/rooms'><button className='btn btn-login' onClick={this.loginHandler.bind(this)}>Let's find a room!</button></Link>
        }
      </div>
    )
  }
}

export default Login
