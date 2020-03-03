import React from 'react';
import { render } from 'react-dom';
import log from './services/log';
import { checkConfig } from './config';
import App from './app';

checkConfig();
log.init();

render(<App />, document.getElementById('root'));
