import React, { Component } from 'react'
import Pizzicato from 'pizzicato'
import Button from './Button'

class Soundboard extends Component {
  render() {
    const sounds = this.props.sounds.map(sound => {
      sound.sound = new Pizzicato.Sound(sound.sound)
      return sound
    })
    .map(sound => {
      return (
        <Button
          key={sound.name}
          name={sound.name}
          sound={sound.sound}
          trigger={sound.trigger}
        />
      )
    })

    return (
      <div className='soundboard'>
        {sounds}
      </div>
    )
  }
}

export default Soundboard
