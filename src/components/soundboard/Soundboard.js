import React, { Component } from 'react'
import Pizzicato from 'pizzicato'
import Button from './Button'

class Soundboard extends Component {
  constructor(props) {
    super(props)
    const sounds = this.props.sounds.map(sound => {
      sound.sound = new Pizzicato.Sound(sound.sound)
      return sound
    })
    this.state = { sounds }
  }

  render() {
    return (
      <div className='soundboard'>
        {this.state.sounds.map(sound => {
            return (
              <Button
                key={sound.name}
                name={sound.name}
                sound={sound.sound}
                trigger={sound.trigger}
              />
            )
          })}
      </div>
    )
  }
}

export default Soundboard
