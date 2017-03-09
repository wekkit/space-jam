import React, { Component } from 'react'

class SynthConfig extends Component {
  render() {
    return (
      <div className='synth-config'>
        <h2>Sustain</h2>
        <div className='slider'>
          0
          <input
            type='range'
            min={0}
            max={3000}
            step={150}
            onChange={this.props.sustainChangeHandler}
            />
          3000
        </div>
      </div>
    )
  }
}

export default SynthConfig
