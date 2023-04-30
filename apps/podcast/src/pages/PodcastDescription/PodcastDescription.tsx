import { Outlet } from 'react-router-dom';

import PodcastSidebar from '@/pages/PodcastDescription/components/PodcastSidebar';
import BackButton from '@/components/common/Backbutton';

import './PodcastDescription.css';

const PodcastDescription = () => {
  return (
    <section className="podcast-description">
      <div className="podcast-description__wrapper">
        <div className="podcast-description__controls">
          <BackButton />
        </div>
        <div className="podcast-description__content">
          <PodcastSidebar />
          <div className="podcast-description__outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastDescription;
