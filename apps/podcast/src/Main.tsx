import { StrictMode, type FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '@/store';
import App from './App';
import '@/assets/i18n/i18n.config';

const AppWrapper: FunctionComponent = () => (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

const app = document.querySelector('#app');

if (app !== null) {
  const root = createRoot(app);
  root.render(<AppWrapper />);
}
