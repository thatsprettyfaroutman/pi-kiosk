import throttle from 'lodash.throttle'

import {
  setTrams,
  setTemperature,
  setRain,
} from './actions'

import {
  getTrams,
  getWeather,
  timeout,
} from '../utils'

import {
  TRAM_STOPS,
  TRAM_LINES,
} from '../config'




const MAIN_POLL_INTERVAL = 5 * 1000
const TRAMS_POLL_INTERVAL = 30 * 1000
const WEATHER_POLL_INTERVAL = 60 * 60 * 1000




const pollTrams = throttle(async store => {
  try {
    const arrivals = await Promise.all(TRAM_STOPS.map( x => getTrams(x) ))
    const sortedArrivals = arrivals
      .reduce( (res, stopTimes) => [...res, ...stopTimes], [] )
      .sort( (a, b) => a.arrival - b.arrival )
      .filter( arrival => TRAM_LINES.includes(arrival.lineName) )
    store.dispatch(setTrams(sortedArrivals))
  } catch (err) {
    console.warn(err)
  }
}, TRAMS_POLL_INTERVAL, { trailing: false })




const pollWeather = throttle(async store => {
  try {
    const { temp, rain } = await getWeather()
    store.dispatch(setTemperature(temp))
    store.dispatch(setRain(rain))
  } catch (err) {
    console.warn(err)
  }
}, WEATHER_POLL_INTERVAL, { trailing: false })




const pollData = (() => {
  let polling = false

  return async store => {
    if (polling) return
    polling = true

    pollTrams(store)
    pollWeather(store)

    await timeout(MAIN_POLL_INTERVAL)
    polling = false
    pollData(store)
  }
})()

export default pollData
