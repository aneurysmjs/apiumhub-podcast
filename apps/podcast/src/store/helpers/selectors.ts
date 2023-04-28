import head from 'ramda/src/head';

import type { RootState } from '@/store';

export const loadingSelector = (actions: string[]) => (state: RootState) => {
  // returns true only when all actions is not loading
  return actions.some((action) => state.api.loading[action]);
};

export const errorMessageSelector = (actions: string[]) => (state: RootState) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  const first = head(actions.map((action) => state.api.error[action]));

  return first || '';
};
