import React from 'react'
import withState from '../../redux/withState'

const Temperature = ({ temperature }) => (
  <div className="Temperature">
    { temperature }°
  </div>
)

export default withState(Temperature)
