import React from 'react';

import ForslagProvider from 'components/providers/forslag';
import ForslagList from 'components/display/forslaglist';

import './landing.less';

export default () => (
  <div className="landing-page container">
    <header className="title">
      <h1>Borgerforslag</h1>
    </header>

    <ForslagProvider>
      <ForslagList forslagList={[]} />
    </ForslagProvider>
  </div>
);
