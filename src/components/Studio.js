import React, { Component } from 'react'
import Soundboard from './soundboard/Soundboard'
import Sine from './soundboard/Sine'
import sounds from '../assets/sounds'
import socket from '../socket'

class Studio extends Component {
  constructor(props) {
    super(props)
    this.state = { studio: undefined, user: undefined }
  }

  componentDidMount() {
    socket.emit('getStudioById', this.props.params.id)
    socket.on('getStudioById', data => {
      console.log('studio data gotten via this.props.sockets', data)
      this.setState({ studio: data })
    })
  }

  render() {
    if (!this.state.studio) {
      return <div>Loading studio...</div>
    } else {
      return (
        <div>
          <p>Studio {this.state.studio.id}: {this.state.studio.name}</p>
          <hr/>
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
        </div>
      )
    }
  }
}

export default Studio
