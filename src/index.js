import React from 'react'
import { render } from 'react-dom'
import log from './services/log'
import { checkConfig } from './config'
import App from './app'
import 'font-awesome/css/font-awesome.css'

checkConfig()
log.init()

render(<App />, document.getElementById('root'))
