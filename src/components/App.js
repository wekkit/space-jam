import React, { Component } from 'react'
import '../App.css'
import Soundboard from './soundboard/Soundboard'
import Sine from './soundboard/Sine'
import Synth from './Synth'
import sounds from '../assets/sounds'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Soundboard sounds={sounds.percussion} />
        <Soundboard sounds={sounds.bass} />
        <hr />
        <div className='sine-board'>
          <Sine frequency={220} trigger={90} name={'A3'}/>
          <Sine frequency={440} trigger={88} name={'A4'}/>
          <Sine frequency={523} trigger={67} name={'C4'}/>
        </div>
        <div className='sine-board'>
          <Sine frequency={261} trigger={86} name={'C3'}/>
          <Sine frequency={440} trigger={66} name={'A4'}/>
          <Sine frequency={659} trigger={78} name={'E5'}/>
        </div>
        <div className='sine-board'>
          <Sine frequency={329} trigger={77} name={'E4'}/>
          <Sine frequency={523} trigger={188} name={'C4'}/>
          <Sine frequency={783} trigger={190} name={'G4'}/>
        </div>
        <Synth />
      </div>
    )
  }
}

export default App
