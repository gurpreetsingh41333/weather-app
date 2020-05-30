import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'core-js';
import 'regenerator-runtime/runtime';

import store from './middleware/Store';
import * as serviceWorker from './serviceWorker';
import Main from './containers/Main';

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
