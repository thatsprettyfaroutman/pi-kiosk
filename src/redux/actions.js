import {
  SET_TRAMS,
  SET_WEATHER,
} from './types'

export const setTrams = trams => ({
  type: SET_TRAMS,
  payload: trams,
})

export const setWeather = weather => ({
  type: SET_WEATHER,
  payload: weather,
})
