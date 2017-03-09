import React, { Component } from 'react'
import Pizzicato from 'pizzicato'
import $ from 'jquery'
import socket from '../../socket'

class Sine extends Component {
  constructor(props) {
    super(props)
    let sineWave = new Pizzicato.Sound(this.props.config)
    this.state = {
      playing: false,
      time: this.props.config.sustain,
      sineWave
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ time: newProps.config.sustain })
  }

  componentDidMount() {
    $(document.body).on('keydown', this.keyHandler.bind(this))
    socket.on(this.props.trigger, () => {
      this.setState({ playing: true })
      this.state.sineWave.play()
      setTimeout(() => {this.setState({ playing: false })}, 100)
      setTimeout(() => {this.state.sineWave.stop()}, this.state.time)
    })
  }
  componentWillUnmount() {
    $(document.body).off('keydown', this.keyHandler.bind(this))
  }

  clickHandler() {
    // console.log(`clicked: ${this.props.config.options.frequency}`)
    socket.emit('playEvent', {
      msg: `sine note played: ${this.props.config.options.frequency}`,
      payload: this.props.trigger
    })
    this.state.sineWave.play()
    setTimeout(() => {this.state.sineWave.stop()}, this.state.time)
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
      <div className='sine'>
        <button
          className='btn btn-sine'
          onClick={this.clickHandler.bind(this)}
          style={styling}
        >
          {this.props.name}
        </button>
      </div>
    )
  }
}

export default Sine
