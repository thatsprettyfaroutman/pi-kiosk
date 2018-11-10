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

let pollTimeout = null




export const startPolling = async store => {
  clearTimeout(pollTimeout)


  Promise.all([
    ...TRAM_STOPS.map(x => getTrams(x)),
    getWeather(),
  ]).then(res => {
    const trams = TRAM_STOPS
      .reduce((r, _, i) => [...r, ...res[i]], [])
      .sort((a, b) => a.arrival - b.arrival)
      .filter(x => TRAM_LINES.includes(x.lineName))
    store.dispatch(setTrams(trams))

    const weather = res[2]
    store.dispatch(setWeather(weather))
  })


  pollTimeout = setTimeout(() => {
    startPolling(store)
  }, 60000)
}
