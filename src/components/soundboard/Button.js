import React, { Component } from 'react'
import $ from 'jquery'

import io from 'socket.io-client'
const socket = io(window.location.host)

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = { playing: false }
  }

  componentDidMount() {
    $(document.body).on('keydown', this.keyHandler.bind(this))
  }
  componentWillUnmount() {
    $(document.body).off('keydown', this.keyHandler.bind(this))
  }

  clickHandler() {
    socket.emit('testing', `event emitted, note played: ${this.props.name}`)
    this.props.sound.stop()
    this.props.sound.play()
    this.setState({playing: true})
    setTimeout(() => this.setState({playing: false}),100)
  }
  keyHandler(e) {
    if (e.keyCode === this.props.trigger) this.clickHandler()
  }

  render() {
    let styling = {}
    if (this.state.playing) {
      styling = {backgroundColor: 'white'}
    } else {
      styling = {}
    }

    return (
      <button
        className='btn-soundboard'
        style={styling}
        onClick={this.clickHandler.bind(this)}
      >
        {this.props.name}
      </button>
    )
  }
}

export default Button
