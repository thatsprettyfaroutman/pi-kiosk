import React from 'react'
import { connect } from 'react-redux'
import {
  setTrams,
  setWeather,
} from './actions'




//------------------------------------------------------------------------------
// Maps
//------------------------------------------------------------------------------

const mapStateToProps = state => ({
  trams: state.trams,
  weather: state.weather,
})

const mapDispatchToProps = dispatch => ({
  setTrams: trams => dispatch(setTrams(trams)),
  setWeather: weather => dispatch(setWeather(weather)),
})




//------------------------------------------------------------------------------
// Hoc
//------------------------------------------------------------------------------

export default Component => {
  const EnhancedComponent = props => <Component {...props} />
  return connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent)
}
