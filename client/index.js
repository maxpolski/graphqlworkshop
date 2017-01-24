import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

import App from './containers/App';
import rootReducer from './reducers/root';

const appRoot = document.getElementById('root');
const logger = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(logger),
);

render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  appRoot,
);
