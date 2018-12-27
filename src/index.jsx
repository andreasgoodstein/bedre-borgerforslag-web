import '@babel/polyfill';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';

import 'styles/index.less';

import { registerServiceWorker } from 'service-worker';

import LandingPage from 'components/layouts/landing';

const initializePage = () => {
  const rootElement = document.getElementById('mitdemokrati-borgerforslag-app');

  render(<LandingPage />, rootElement);
};

registerServiceWorker();

initializePage();
