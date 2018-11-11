import {
  SET_TRAMS,
  SET_TEMPERATURE,
  SET_RAIN,
} from './types'

export const setTrams = trams => ({
  type: SET_TRAMS,
  payload: trams,
})

export const setTemperature = temp => ({
  type: SET_TEMPERATURE,
  payload: temp,
})

export const setRain = bool => ({
  type: SET_RAIN,
  payload: bool,
})
