import {
  SET_TRAMS,
  SET_TEMPERATURE,
  SET_RAIN,
} from './types'

export const trams = (state = [], { type, payload }) => {
  switch(type) {
    case SET_TRAMS:
      return payload

    default:
      return state
  }
}

export const temperature = (state = 0, { type, payload }) => {
  switch(type) {
    case SET_TEMPERATURE:
      return payload

    default:
      return state
  }
}

export const rain = (state = false, { type, payload }) => {
  switch(type) {
    case SET_RAIN:
      return payload

    default:
      return state
  }
}
