import {
  SET_TRAMS,
  SET_WEATHER,
} from './types'

export const trams = (state = [], { type, payload }) => {
  switch(type) {
    case SET_TRAMS:
      return payload

    default:
      return state
  }
}

export const weather = (state = 0, { type, payload }) => {
  switch(type) {
    case SET_WEATHER:
      return payload

    default:
      return state
  }
}
