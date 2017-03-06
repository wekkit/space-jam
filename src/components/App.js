import React, { Component } from 'react'
import '../App.css'
import Soundboard from './soundboard/Soundboard'
import Sine from './soundboard/Sine'
import sounds from '../assets/sounds'
import io from 'socket.io-client'
const socket = io.connect()

class App extends Component {

  clickHandler() {
    socket.emit('testing', 'event emitted, app clicked')
  }

  log(msg) {
    console.log(msg)
  }

  render() {
    return (
      <div className='app' onClick={this.clickHandler.bind(this)}>
        <h1>SPACE JAM</h1>
        <Soundboard sounds={sounds.percussion} />
        <Soundboard sounds={sounds.bass} />
        <div className='sine-board'>
          <Sine frequency={220} keycode={90}/>
          <Sine frequency={440} keycode={88}/>
          <Sine frequency={660} keycode={67}/>
          <Sine frequency={880} keycode={86}/>
        </div>
      </div>
    )
  }
}

export default App
