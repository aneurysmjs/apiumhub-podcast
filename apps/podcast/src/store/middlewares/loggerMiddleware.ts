/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Middleware } from 'redux';

const logger: Middleware = (store) => (next) => (action) => {
  if (!console.group) {
    return next;
  }

  console.group(action.type);
  console.log('%c prev state', 'color: gray', store.getState());
  console.log('%c action', 'color: blue', action);
  const returnValue = next(action);
  console.log('%c next state', 'color: green', store.getState());
  // @ts-ignore
  console.groupEnd(action.type);
  console.log('returnValue', returnValue);

  return returnValue;
};

export default logger;
