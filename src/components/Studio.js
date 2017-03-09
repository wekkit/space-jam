import React, { Component } from 'react'
import Soundboard from './soundboard/Soundboard'
import Synth from './soundboard/Synth'
import SynthConfig from './soundboard/SynthConfig'
import sounds from '../assets/sounds'
import socket from '../socket'
import { Link } from 'react-router'

class Studio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studio: null,
      users: null,
      sounds: sounds,
      synth: {
        source: 'wave',
        attack: 0.5,
        release: 0.5,
        sustain: 1000,
        options: {
          type: 'sine'
        }
      }
    }
  }

  componentWillMount() {
    socket.emit('getStudioById', this.props.params.id)
    socket.on('getStudioById', data => {
      this.setState({ studio: data })
    })
    socket.on('getStudioUsers', users => {
      this.setState({ users: users })
    })
  }

  sustainChangeHandler(e) {
    const newSynthSettings = JSON.parse(JSON.stringify(this.state.synth))
    newSynthSettings.sustain = e.target.value
    this.setState({ synth: newSynthSettings })
  }

  leaveRoomHandler() {
    socket.emit('leaveRoom')
  }

  render() {
    if (!this.state.studio || !this.state.users) {
      return <div></div>
    } else {
      return (
        <div className='studio'>
          <h2>Studio {this.state.studio.id}: {this.state.studio.name}</h2>
          <div className='user-list'> {'Users in room: '}
            {this.state.users
              .map((user) => {
                return user.name
              })
              .join(', ')
            }
          </div>
          {/* <Link to='/rooms'><button className='btn btn-leave' onClick={this.leaveRoomHandler}>Leave Room</button></Link>
          <Link to='/rooms'><button className='btn btn-delete' onClick={this.leaveRoomHandler}>Delete Room</button></Link> */}
          <hr/>
          <Soundboard sounds={this.state.sounds.percussion} />
          <Soundboard sounds={this.state.sounds.bass} />
          <hr />
          <SynthConfig
            sustainChangeHandler={this.sustainChangeHandler.bind(this)}
          />
          <Synth config={this.state.synth}/>
        </div>
      )
    }
  }
}

export default Studio
