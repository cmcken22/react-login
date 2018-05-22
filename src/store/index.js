import { applyMiddleware, createStore, compose } from 'redux';
// import { documentHistory } from 'frontend-g3-common-ui/middleware/documentHistoryMiddleware';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {createLogger} from 'redux-logger';

export default function configureStore(initialState) {

  // const documentHistoryMiddleware = documentHistory({
  //   reducers: [
  //     'primePayApplicationDocument',
  //     'payments',
  //     'attachments',
  //     'primeLines',
  //     'subLines'
  //   ],
  //   includedActions: [
  //     'primePayApplicationDocument_SET',
  //     'payments_ADD_NEW_LINE',
  //     'payments_UPDATE_LINE_VALUE',
  //     'attachments_ADD_ATTACHMENT',
  //     'attachments_UPDATE_ATTACHMENT_VALUE',
  //     'primeLines_SET_LINE_INVALID',
  //     'subLines_SET_SUBLINE_INVALID'
  //   ]
  // });

  let middlewares = [thunk,
    // documentHistoryMiddleware
  ];

  if (process.env.NODE_ENV === 'prod') { 
    return createStore(reducers, initialState, applyMiddleware( ...middlewares));
  } else {
    const composeEnhancers = 
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    middlewares.push(createLogger({collapsed:true}));
    return createStore(reducers, initialState, composeEnhancers(applyMiddleware( ...middlewares)));
  }
}