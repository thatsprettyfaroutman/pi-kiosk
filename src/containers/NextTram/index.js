import React from 'react'
import withState from '../../redux/withState'

const NextTram = ({ trams }) => {

  if (!trams.length) return (
    <div className="NextTram">
      umm
    </div>
  )

  const minutes = trams[0].arrival || 0
  let content = minutes
  if (minutes < 2) content = 'now'
  if (minutes < 1) content = 'hurry'

  return (
    <div className="NextTram">
      { content } { minutes < 2 ? null : <span>min</span> }
    </div>
  )
}

export default withState(NextTram)
