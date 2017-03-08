import React, { Component } from 'react'
import { Link } from 'react-router'
import socket from '../socket'

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      studios: [],
      newStudioName: null
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
  }

  changeNameHandler(e) {
    this.setState({ newStudioName: e.target.value })
  }

  render() {
    return (
      <div>
        <h1>This is a list of the rooms available:</h1>
        {this.state.studios.map((studio, index) => {
          return (
            <Link
              to={'/studio/' + studio.id}
              key={index}
            >
              <button
                className='btn btn-login'
                onClick={() => socket.emit('joinRoom', studio)}
              >{studio.name}</button>
            </Link>
          )
        })}
        <hr/>
        <input type='text' onChange={this.changeNameHandler.bind(this)}></input>
        {this.state.newStudioName && <button onClick={this.createRoomHandler.bind(this)}>Create a room </button>}
      </div>
    )
  }
}

export default Rooms
