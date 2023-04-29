import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import middlewares from '@/store/middlewares';
import { podcastReducer as podcast } from '@/store/modules/podcast/reducers';

import { loadState } from './persistentState';
import { apiReducer as api } from './reducers';

export const rootReducer = combineReducers({
  api,
  podcast,
});

const persistedState = loadState() as ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, persistedState, composeWithDevTools(middleWareEnhancer));

  return store;
}
