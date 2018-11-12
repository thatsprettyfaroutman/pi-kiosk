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

  // There is time to take out the trash
  if (minutes < 3) content = 'trash'

  // Good time to leave
  if (minutes < 2) content = 'now'

  // Gotta run!
  if (minutes < 1) content = 'hurry'

  return (
    <div className="NextTram">
      { content } { minutes < 3 ? null : <span>min</span> }
    </div>
  )
}

export default withState(NextTram)
