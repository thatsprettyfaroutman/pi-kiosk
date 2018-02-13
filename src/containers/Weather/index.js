import React from 'react'
import withState from '../../redux/withState'

const Weather = ({weather}) => (
  <div className="Weather">
    { weather }°
  </div>
)

export default withState(Weather)
