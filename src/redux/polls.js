import {
  setTrams,
  setWeather,
} from './actions'

import {
  getHslData,
  getJson,
  timeBetweenTramAndNow,
} from '../utils'

const TRAM_STOP_ID_FOR_7 = 'HSL:1203406'
const TRAM_STOP_ID_FOR_9 = 'HSL:1203422'
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Helsinki,FI&appid=7d05f32d3baaae6039efc0453838c0b1&units=metric'
const WALKTIME_IN_SECONDS = 4 * 60

let pollTimeout = null




export const startPolling = async store => {
  clearTimeout(pollTimeout)


  const trams7 = await getTrams(TRAM_STOP_ID_FOR_7)
  const trams9 = await getTrams(TRAM_STOP_ID_FOR_9)
  const trams = [...trams7, ...trams9]
    .sort((a, b) => a.arrival - b.arrival)
    .filter(x => x.lineName !== '9' || x.lineName !== '7')
  store.dispatch(setTrams(trams))

  const weather = await getWeather()
  store.dispatch(setWeather(weather))


  pollTimeout = setTimeout(() => {
    startPolling(store)
  }, 60000)
}




const getTrams = (
  stopId = TRAM_STOP_ID_FOR_7,
  startTime = Math.round(Date.now() / 1000) + WALKTIME_IN_SECONDS
) => getHslData(`
  {
  stop(id:"${stopId}"){
    name
    gtfsId
    stoptimesWithoutPatterns(
      startTime:"${startTime}",
      timeRange: 18000,
      numberOfDepartures:10
    ) {
      scheduledArrival
      scheduledDeparture
      realtimeArrival
      serviceDay
      stopHeadsign
      trip {
        route {
          gtfsId
          longName
          shortName
        }
      }
    }
  }
}`)
  .then(res => res.data.stop.stoptimesWithoutPatterns)
  .then(res => res.map(x => ({
    arrival: parseInt(timeBetweenTramAndNow(x.realtimeArrival) / 60, 10),
    lineName: x.trip.route.shortName,
  })))




const getWeather = () => getJson(WEATHER_URL)
  .then(res => {
    if (!res || !res.main || !res.main.temp) return 0
    return Math.round(res.main.temp)
  })
