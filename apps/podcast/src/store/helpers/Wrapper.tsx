import { FunctionComponent, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import store from '@/store';

const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default Wrapper;
