import React, { Component } from 'react'
import { Link } from 'react-router'
import socket from '../socket'

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studios: [],
      newStudioName: ''
    }
  }

  componentDidMount() {
    socket.emit('getStudios')
    socket.on('getStudios', (data) => {
      this.setState({ studios: data })
    })
  }

  createRoomHandler() {
    socket.emit('createRoom', {name: this.state.newStudioName})
    this.setState({ newStudioName: '' })
  }

  changeNameHandler(e) {
    this.setState({ newStudioName: e.target.value })
  }

  render() {
    return (
      <div className='rooms'>
        <h1>This is a list of the rooms available:</h1>
        {this.state.studios.map((studio, index) => {
          return (
            <Link
              to={'/studio/' + studio.id}
              key={index}
            >
              <button
                className='btn btn-room'
                onClick={() => socket.emit('joinRoom', studio)}
              ><p className='tiny'>Studio {index + 1}:</p>{studio.name}</button>
            </Link>
          )
        })}
        <hr/>
        <div className='create-room'>
          <h2>Create a room!</h2>
          <input className='text-input' type='text' value={this.state.newStudioName} onChange={this.changeNameHandler.bind(this)}></input>
          {this.state.newStudioName &&
            <button className='btn btn-create-room' onClick={this.createRoomHandler.bind(this)}>Create a room </button>}
        </div>
      </div>
    )
  }
}

export default Rooms
