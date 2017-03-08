import React, { Component } from 'react'
import { Link } from 'react-router'

class currentUserList extends Component {
  render() {
    return (
      <div>
        This is a list of current users
        <Link to='/studio'><button className='btn btn-sine'>Go to studio</button></Link>
      </div>
    )
  }
}

export default currentUserList
