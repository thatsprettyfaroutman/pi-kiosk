import differenceInMinutes from 'date-fns/difference_in_minutes'
import { WALK_MINUTES } from '../config'

const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Helsinki,FI&appid=7d05f32d3baaae6039efc0453838c0b1&units=metric'
const TRAMS_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'




export const getNowInSeconds = () => Math.round(Date.now() / 1000)




export const getJson = async url => {
  const res = await fetch(url)
  if (res.status !== 200) throw new Error(res.status)
  return await res.json()
}




export const getHslData = async query => {
  const res = await fetch(TRAMS_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql'
    },
    body: query,
  })

  if (res.status !== 200) throw new Error(res.status)
  return await res.json()
}




export const getTrams = async ( stopId, startTime = getNowInSeconds() ) => {
  const res = await getHslData(`
    {
      stop(id:"${ stopId }"){
        name
        gtfsId
        stoptimesWithoutPatterns(
          startTime:"${ startTime }",
          timeRange: 18000,
          numberOfDepartures:4
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
    }`
  )

  const stopTimes =
    res &&
    res.data &&
    res.data.stop &&
    res.data.stop.stoptimesWithoutPatterns

  if ( !stopTimes ) return {}

  const now = Date.now()

  return stopTimes
    .map(stopTime => {
      const arrivalDate =
        new Date((stopTime.serviceDay + stopTime.realtimeArrival) * 1000)
      const arrivalInMinutes = differenceInMinutes(arrivalDate, now)
      const arrival = arrivalInMinutes - WALK_MINUTES
      return ({
        arrival,
        lineName: stopTime.trip.route.shortName,
      })
    })
    .filter( stopTime => stopTime.arrival >= 0 )
}




export const getWeather = async () => {
  const res = await getJson(WEATHER_URL)
  const temp =
    res &&
    res.main &&
    res.main.temp

  if ( !temp ) return 0

  return Math.round(temp)
}




export const pollRefresh = async ( interval = 10000 ) => {
  await timeout(interval)

  for (let i = 0; i < 2; i++) {
    let res = await fetch(window.location)
    if ( res.status === 200 ) {
      window.location.reload()
      return
    }
    await timeout(i === 0 ? 1000 : 0)
  }

  pollRefresh(interval)
}




export const timeout = ms =>
  new Promise(resolve => setTimeout(() => resolve(true), ms))
