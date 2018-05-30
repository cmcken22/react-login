import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

require('./scss/main.scss');

import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})