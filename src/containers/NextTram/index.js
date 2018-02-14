import React from 'react'
import withState from '../../redux/withState'

const NextTram = ({ trams }) => {

  if (!trams.length) return (
    <div className="NextTram">
      umm
    </div>
  )

  const minutes = trams[0].arrival || 0
  const content = minutes < 1 ? 'now' : minutes

  return (
    <div className="NextTram">
      { content } { minutes < 1 ? null : <span>min</span> }
    </div>
  )
}

export default withState(NextTram)
