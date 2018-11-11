import './index.css'
import React from 'react'
import withState from '../../redux/withState'
import src from './rain.mp4'

const Rain = ({ rain }) => {

  if ( !rain ) return null

  return (
    <div className="Rain">
      <video autoplay="autoplay" muted="muted" loop src={ src } />
    </div>
  )
}

export default withState(Rain)
