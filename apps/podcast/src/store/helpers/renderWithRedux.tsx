import { ReactNode } from 'react';
import { legacy_createStore as createStore, Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { render, RenderResult } from '@testing-library/react';
import { rootReducer } from '@/store/helpers/configureStore';
import { RootState } from '@/store';
import middlewares from '@/store/middlewares';

type WithReduxConfig = {
  initialState?: RootState;
  store?: Store<RootState>;
};

export interface RenderWithRedux extends RenderResult {
  store: Store<RootState>;
}

const middleWareEnhancer = applyMiddleware(...middlewares);

export default function renderWithRedux(
  ui: ReactNode,
  {
    initialState,
    store = createStore(rootReducer, initialState, middleWareEnhancer),
  }: WithReduxConfig = {},
): RenderWithRedux {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}
