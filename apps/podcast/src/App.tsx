import { FunctionComponent, StrictMode } from 'react';

import './assets/css/styles.css';

import Routing from '@/routing';

const App: FunctionComponent = () => (
  <StrictMode>
    <Routing />
  </StrictMode>
);

export default App;
