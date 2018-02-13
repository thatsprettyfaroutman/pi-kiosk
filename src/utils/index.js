export const nowTodayInSeconds = () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  return Math.round((Date.now() - start.getTime()) / 1000)
}




export const timeBetweenTramAndNow = (tramTime, now=nowTodayInSeconds()) => {
  // !!! Such haxy solutions, don't use in anything real
  const SECONDS_IN_DAY = 86400
  let diff = tramTime - now

  // Midnight passing hax thingies
  if (diff > SECONDS_IN_DAY) {
    return (tramTime - SECONDS_IN_DAY) - now
  } else if (diff > SECONDS_IN_DAY / 2 && tramTime > now) {
    return tramTime - ( now + SECONDS_IN_DAY )
  }
  return diff
}




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
})




export const getHslData = query => new Promise(resolve => {
  fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
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
      console.warn(err)
    })
})
