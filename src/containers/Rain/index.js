import './index.css'
import React from 'react'
import withState from '../../redux/withState'
import videoSource from './rain.mp4'

const Rain = ({ rain }) => {

  if ( !rain ) return null

  return (
    <div className="Rain">
      <video autoPlay muted loop src={ videoSource } />
    </div>
  )
}

export default withState(Rain)
