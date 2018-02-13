import React from 'react'
import withState from '../../redux/withState'

const NextTram = ({ trams }) => (
  <div className="NextTram">
    { trams[0] ? trams[0].arrival : 0 }<span>min</span>
  </div>
)

export default withState(NextTram)
