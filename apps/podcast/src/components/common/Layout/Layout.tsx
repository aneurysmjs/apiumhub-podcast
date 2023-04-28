import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

import './Layout.css';

const Layout: FunctionComponent = () => (
  <main className="layout">
    <Navbar />
    <div className="layout__content">
      <Outlet />
    </div>
    <Footer />
  </main>
);

export default Layout;
