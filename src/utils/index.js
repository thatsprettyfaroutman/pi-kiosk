import differenceInMinutes from 'date-fns/difference_in_minutes'

import { WALK_MINUTES } from '../config'

const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?q=Helsinki,FI&appid=7d05f32d3baaae6039efc0453838c0b1&units=metric'
const TRAMS_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'




export const getNowInSeconds = () => Math.round(Date.now() / 1000)




export const getJson = url => new Promise(resolve => {
  return fetch(url)
    .then(res => {
      switch (res.status) {
        case 200:
          const data = res.json()
          return data

        default:
          resolve(null)
      }
    })
    .then(data => {
      resolve(data)
    })
    .catch(() => resolve({}))
})




export const getHslData = query => new Promise(resolve => {
  fetch(TRAMS_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql'
    },
    body: query
  })
    .then(res => {
      if (res.status !== 200) throw new Error(res.status)
      const data = res.json()
      return data
    })
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      resolve([])
      console.warn(err)
    })
})




export const getTrams = ( stopId, startTime = getNowInSeconds()) => {
  return new Promise(resolve => {
    if (!stopId) return resolve([])
    getHslData(`
      {
        stop(id:"${stopId}"){
          name
          gtfsId
          stoptimesWithoutPatterns(
            startTime:"${startTime}",
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
      .then(res => res.data.stop.stoptimesWithoutPatterns)
      .then(res => {
        const now = new Date()
        resolve(res
          .map(x => {
            const arrivalDate = new Date((x.serviceDay + x.realtimeArrival) * 1000)
            const arrivalInMinutes = differenceInMinutes(arrivalDate, now)
            const arrival = arrivalInMinutes - WALK_MINUTES
            return ({
              arrival,
              lineName: x.trip.route.shortName,
            })
          })
          .filter(x => x.arrival >= 0)
        )
      })
  })


}





export const getWeather = () => getJson(WEATHER_URL)
  .then(res => {
    if (!res || !res.main || !res.main.temp) return 0
    return Math.round(res.main.temp)
  })




export const pollRefresh = ( interval = 10000 ) => {
  setTimeout(() => {
    fetch(window.location).then(res => {
      if (res.status === 200) {
        window.location = window.location
        return
      }

      pollRefresh()
    })
  }, interval)
}
