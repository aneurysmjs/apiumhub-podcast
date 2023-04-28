import thunk from 'redux-thunk';

import apiMiddleware from './apiMiddleware';
import logger from './loggerMiddleware';

const middlewares = [thunk, apiMiddleware];

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  middlewares.push(logger);
}

export default middlewares;
