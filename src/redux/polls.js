import {
  setTrams,
  setWeather,
} from './actions'

import {
  getTrams,
  getWeather,
} from '../utils'

import {
  TRAM_STOPS,
  TRAM_LINES,
} from '../config'




export const startPolling = (() => {
  let pollTimeout = null

  return async store => {
    clearTimeout(pollTimeout)

    const arrivals = await Promise.all(TRAM_STOPS.map( x => getTrams(x) ))
    const sortedArrivals = arrivals
      .reduce( (res, stopTimes) => [...res, ...stopTimes], [] )
      .sort( (a, b) => a.arrival - b.arrival )
      .filter( arrival => TRAM_LINES.includes(arrival.lineName) )
    store.dispatch(setTrams(sortedArrivals))

    const weather = await getWeather()
    store.dispatch(setWeather(weather))

    pollTimeout = setTimeout(() => {
      startPolling(store)
    }, 60000)
  }
})()
