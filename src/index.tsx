import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { App } from './app/App';
import { rootState } from './app/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={rootState}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
