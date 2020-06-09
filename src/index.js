import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'
import * as swRegisterer from './swRegisterer'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from 'reducers'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

swRegisterer.register()
