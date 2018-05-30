import React from 'react';
import { render } from 'react-dom';
// import configureStore from './store';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import App from './components/App.jsx';
import { getCharacters } from './reducers/characters/actions';

require('./scss/main.scss');

// const store = configureStore();

// Create redux store
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

store.dispatch(getCharacters());

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);