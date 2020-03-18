import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'
import * as swRegisterer from './swRegisterer'

ReactDOM.render(<App />, document.getElementById('root'))

swRegisterer.register()
