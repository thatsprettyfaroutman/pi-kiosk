import React from 'react'
import { connect } from 'react-redux'
import {
  setTrams,
  setTemperature,
  setRain,
} from './actions'




//------------------------------------------------------------------------------
// Maps
//------------------------------------------------------------------------------

const mapStateToProps = state => ({
  trams: state.trams,
  temperature: state.temperature,
  rain: state.rain,
})

const mapDispatchToProps = dispatch => ({
  setTrams: trams => dispatch(setTrams(trams)),
  setTemperature: temp => dispatch(setTemperature(temp)),
  setRain: bool => dispatch(setRain(bool)),
})




//------------------------------------------------------------------------------
// Hoc
//------------------------------------------------------------------------------

export default Component => {
  const EnhancedComponent = props => <Component {...props} />
  return connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent)
}
