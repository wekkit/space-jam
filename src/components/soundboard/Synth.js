import React, { Component } from 'react'
import Sine from './Sine'

const synthSounds = [
  { freq: 220, trigger: 90, name: 'A3' },
  { freq: 440, trigger: 88, name: 'A4' },
  { freq: 523, trigger: 67, name: 'C4' },
  { freq: 261, trigger: 86, name: 'C3' },
  { freq: 440, trigger: 66, name: 'A4' },
  { freq: 659, trigger: 78, name: 'E5' },
  { freq: 329, trigger: 77, name: 'E4' },
  { freq: 523, trigger: 188, name: 'C4' },
  { freq: 783, trigger: 190, name: 'G4' }
]

class Synth extends Component {
  constructor(props) {
    super(props)
    let synth =
    synthSounds.map((synth, i) => {
          const configWithFreq = JSON.parse(JSON.stringify(this.props.config))
          configWithFreq.options.frequency = synth.freq
          return <Sine
            key={i}
            name={synth.name}
            trigger={synth.trigger}
            config={configWithFreq}
            />
        })
    this.state = { synth }
  }

  componentWillReceiveProps(nextProps) {
    let newSynth = synthSounds.map((synth, i) => {
          const configWithFreq = JSON.parse(JSON.stringify(nextProps.config))
          configWithFreq.options.frequency = synth.freq
          return <Sine
            key={i}
            name={synth.name}
            trigger={synth.trigger}
            config={configWithFreq}
            />
        })
    this.setState({ synth: newSynth })
  }

  render() {
    return (
      <div className='sine-board'>
        {this.state.synth}
      </div>
    )
  }
}

export default Synth