import { StrictMode, type FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import throttle from 'lodash.throttle';

import { saveState } from '@/store/helpers/persistentState';
import store from '@/store';
import { selectPodcast } from '@/store/modules/podcast/selectors';

import App from './App';
import '@/assets/i18n/i18n.config';

store.subscribe(
  throttle(() => {
    saveState({
      podcast: {
        podcastList: selectPodcast(store.getState()),
      },
    });
  }, 1000),
);

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
