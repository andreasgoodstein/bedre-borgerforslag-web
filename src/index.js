import '@babel/polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';

import LandingPage from './components/layouts/landing/index.jsx';

const rootElement = document.getElementById('mitdemokrati-borgerforslag-app');

render(<LandingPage />, rootElement);
