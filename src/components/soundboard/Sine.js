import React, { Component } from 'react'
import Pizzicato from 'pizzicato'
import $ from 'jquery'

class Sine extends Component {
  constructor(props) {
    super(props)
    const sineWave = new Pizzicato.Sound({
      source: 'wave',
      options: {
        frequency: this.props.frequency
      }
    })
    sineWave.attack = 0.3
    sineWave.release = 1
    this.state = {
      playing: false,
      time: 500,
      sineWave
    }
  }

  componentDidMount() {
    $(document.body).on('keydown', this.keyHandler.bind(this))
  }
  componentWillUnmount() {
    $(document.body).off('keydown', this.keyHandler.bind(this))
  }

  changeAttackHandler(e) {
    this.state.sineWave.stop()
    const newSine = this.state.sineWave
    newSine.attack = e.target.value
    this.setState({ sineWave: newSine })
  }

  changeReleaseHandler(e) {
    this.state.sineWave.stop()
    const newSine = this.state.sineWave
    newSine.release = e.target.value
    this.setState({ sineWave: newSine })
  }

  changeTimeHandler(e) {
    this.setState({ time: e.target.value })
  }


  clickHandler() {
    this.setState({ playing: true })
    this.state.sineWave.play()
    setTimeout(() => {this.setState({ playing: false })}, 100)
    setTimeout(() => {this.state.sineWave.stop()}, this.state.time)
  }

  keyHandler(e) {
    if (e.keyCode === this.props.keycode) this.clickHandler()
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
        <ul>
          <li><input onChange={this.changeAttackHandler.bind(this)} placeholder='attack'></input></li>
          <li><input onChange={this.changeReleaseHandler.bind(this)} placeholder='release'></input></li>
          <li><input onChange={this.changeTimeHandler.bind(this)} placeholder='hold'></input></li>
        </ul>
        <button
          className='btn-soundboard'
          onClick={this.clickHandler.bind(this)}
          style={styling}
        >
          {this.props.frequency + 'Hz'}
        </button>
      </div>
    )
  }
}

export default Sine
