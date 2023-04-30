import { type FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { usePrevious } from '@apiumhub/hooks';
import { useAppSelector } from '@/store/hooks';
import { selectPodcastDescription } from '@/store/modules/podcast/selectors';
import { usePodcastActions } from '@/store/modules/podcast/actions';

import './PodcastSidebar.css';

const PodcastSidebar: FunctionComponent = () => {
  const { id } = useParams();
  const prevId = usePrevious(id);
  const podcastDescription = useAppSelector(selectPodcastDescription);
  const { getPodcastDescription } = usePodcastActions();

  useEffect(() => {
    if (id && id !== prevId) {
      getPodcastDescription(id);
    }
  }, [getPodcastDescription, id, prevId]);

  return (
    <aside className="podcast-sidebar">
      <figure>
        <img className="podcast-sidebar__img" src={podcastDescription?.artworkUrl600} alt="" />
      </figure>
      <article>
        <header className="podcast-sidebar__title">
          <h5>{podcastDescription?.collectionName}</h5>
        </header>
        <p className="podcast-sidebar__artist">
          <span>By: </span>
          {podcastDescription?.artistName}
        </p>
      </article>
    </aside>
  );
};

export default PodcastSidebar;
