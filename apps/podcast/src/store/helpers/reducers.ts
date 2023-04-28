/* eslint-disable default-param-last */
import { combineReducers, Action } from 'redux';

type LoadingState = {
  [K: string]: boolean;
};

const loadingInitialState: LoadingState = {};

function loadingReducer(state = loadingInitialState, action: Action) {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type as string);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
}

type ErrorState = {
  [K: string]: boolean | string;
};

type ErrorAction = {
  payload: string;
} & Action;

const errorInitialState: ErrorState = {};

function errorReducer(state = errorInitialState, action: ErrorAction) {
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(action.type as string);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    // else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? action.payload : '',
  };
}

// eslint-disable-next-line import/prefer-default-export
export const apiReducer = combineReducers({
  loading: loadingReducer,
  error: errorReducer,
});
