import React from 'react'
import withState from '../../redux/withState'

const WhichTram = ({ lineName, trams }) => (
  <div
    className={
      trams[0] && trams[0].lineName === lineName ?
        'WhichTram WhichTram--active' :
        'WhichTram'
    }
    children={ lineName }
  />
)

export default withState(WhichTram)
