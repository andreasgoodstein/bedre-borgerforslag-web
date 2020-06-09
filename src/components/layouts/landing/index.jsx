import React from 'react';

import ForslagProvider from 'components/providers/forslag';
import ForslagList from 'components/display/forslaglist';

import './landing.less';

export default () => (
  <div className="landing-page container">
    <header className="title">
      <h1>Borgerforslag</h1>
      <a href="https://www.borgerforslag.dk" target="_blank" rel="noopener noreferrer" aria-label="Gå til borgerforslag.dk">www.borgerforslag.dk</a>
    </header>

    <ForslagProvider>
      <ForslagList forslagList={[]} />
    </ForslagProvider>

    <footer className="footer">
      <div>
        <a href="https://mitdemokrati.com">{'< Tilbage'}</a>
      </div>

      <div className="text-left">
        <p>MitDemokrati</p>
        <a href="mailto:support@mitdemokrati.com">support@mitdemokrati.com</a>
      </div>

      <div className="text-right">
        <p>Skabt af Andreas Goodstein</p>
        <a href="https://andreasgoodstein.com">andreasgoodstein.com</a>
      </div>
    </footer>
  </div>
);
