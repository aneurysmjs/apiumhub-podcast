import { type FunctionComponent } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from '@/components/common/Layout';
import Home from '@/pages/Home';

const Routing: FunctionComponent = () => (
  <Router>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </Router>
);

export default Routing;
