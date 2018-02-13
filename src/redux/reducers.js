import {
  SET_TRAMS,
  SET_WEATHER,
} from './types'

export const trams = (state=[], action) => {
  switch(action.type) {
    case SET_TRAMS:
      return action.payload

    default:
      return state
  }
}

export const weather = (state='0', action) => {
  switch(action.type) {
    case SET_WEATHER:
      return action.payload

    default:
      return state
  }
}
