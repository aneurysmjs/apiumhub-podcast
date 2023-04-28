import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import middlewares from '@/store/middlewares';
import { podcastReducer as podcast } from '@/store/modules/podcast/reducers';

import { apiReducer as api } from './reducers';

export const rootReducer = combineReducers({
  api,
  podcast,
});

export default function configureStore() {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
