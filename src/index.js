import 'babel-polyfill'
import 'whatwg-fetch'

import './index.css'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import * as reducers from './redux/reducers'
import pollData from './redux/polls'
import { pollRefresh } from './utils'

import Time from './components/Time'

import Temperature from './containers/Temperature'
import WhichTram from './containers/WhichTram'
import NextTram from './containers/NextTram'
import Rain from './containers/Rain'




// Setup redux state
const preservedState = {}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers(reducers),
  preservedState,
  composeEnhancers(applyMiddleware(thunk))
)




const App = () => (
  <Fragment>
    <Rain />
    <Time />
    <WhichTram lineName="9" />
    <NextTram />
    <WhichTram lineName="7" />
    <Temperature />
  </Fragment>
)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))



// Start data polling
pollData(store)

// Attempt to refresh every 12 hours
pollRefresh(1000 * 60 * 60 * 12)
