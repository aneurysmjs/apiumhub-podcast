import { type FunctionComponent, Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import Home from '@/pages/Home';

const PageLoader = () => <div>Loading...</div>;

const PodcastDescription = lazy(() => import('@/pages/PodcastDescription'));
const EpisodesList = lazy(() => import('@/pages/PodcastDescription/components/EpisodesList'));

const Routing: FunctionComponent = () => (
  <Router>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<Home />} />
        <Route
          path="/podcast/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <PodcastDescription />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <EpisodesList />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  </Router>
);

export default Routing;
