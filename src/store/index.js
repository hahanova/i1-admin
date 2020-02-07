import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares = composeWithDevTools(applyMiddleware(
  logger,
  thunk,
));

export default createStore(rootReducer, middlewares);

export * from './users';
export * from './courses';