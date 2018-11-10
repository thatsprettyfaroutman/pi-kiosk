import 'babel-polyfill'

import './index.css'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import * as reducers from './redux/reducers'
import { startPolling } from './redux/polls'
import { pollRefresh } from './utils'

import Time from './components/Time'

import Weather from './containers/Weather'
import WhichTram from './containers/WhichTram'
import NextTram from './containers/NextTram'




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
    <Weather />
    <WhichTram lineName="9" />
    <NextTram />
    <WhichTram lineName="7" />
    <Time />
  </Fragment>
)

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))




startPolling(store)

// Attempt to refresh every 12 hours
pollRefresh(1000 * 60 * 60 * 12)
