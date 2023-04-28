/* eslint-disable consistent-return */
import type { Middleware } from 'redux';
import type { AxiosResponse } from 'axios';

import type { RootState } from '@/store';
import { ApiMetaType } from '@/shared/types';

const apiMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    let meta: ApiMetaType = {};

    if (action.meta) {
      meta = { ...action.meta };
    }

    if (!action.meta && !meta.types) {
      // Normal action: pass it on
      return next(action);
    }

    const { payload = {} } = action;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { types, callAPI, shouldCallAPI = (state: RootState): boolean => true } = meta;

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch({
      payload: { ...payload },
      type: requestType,
    });

    (async () => {
      try {
        const response = (await callAPI()) as AxiosResponse;

        const { data } = response;

        dispatch({
          payload: data,
          type: successType,
        });
        /**
         * Typescript does not support annotations on the catch variable. There is a proposal to allow this but it is still being discussed
         * @link https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
         */
      } catch (error) {
        dispatch({
          payload: (error as Error).message,
          type: failureType,
        });
      }
    })();
  };

export default apiMiddleware;
