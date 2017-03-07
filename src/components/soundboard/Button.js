import React, { Component } from 'react'
import $ from 'jquery'

import io from 'socket.io-client'
const socket = io()

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = { playing: false }
  }

  componentDidMount() {
    $(document.body).on('keydown', this.keyHandler.bind(this))
    socket.on(this.props.trigger, (msg) => {
      console.log(msg)
      this.props.sound.stop()
      this.props.sound.play()
      this.setState({playing: true})
      setTimeout(() => this.setState({playing: false}),100)
    })
  }
  componentWillUnmount() {
    $(document.body).off('keydown', this.keyHandler.bind(this))
  }

  clickHandler() {
    socket.emit('playEvent', {msg:`note played: ${this.props.name}`, payload: this.props.trigger})
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
        className='btn btn-soundboard'
        style={styling}
        onClick={this.clickHandler.bind(this)}
      >
        {this.props.name}
      </button>
    )
  }
}

export default Button
