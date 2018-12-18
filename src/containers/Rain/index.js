import './index.css'
import React from 'react'
import withState from '../../redux/withState'
import rainSource from './rain.mp4'
import snowSource from './snow.mp4'

const Rain = ({ rain, temperature }) => {

  if ( !rain ) return null

  const source = Number(temperature) > 0 ? rainSource : snowSource

  return (
    <div className="Rain">
      <video autoPlay muted loop src={ source } />
    </div>
  )
}

export default withState(Rain)
