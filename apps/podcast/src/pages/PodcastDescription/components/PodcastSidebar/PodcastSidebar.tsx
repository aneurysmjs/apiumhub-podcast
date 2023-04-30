import { type FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePrevious } from '@apiumhub/hooks';
import { useAppSelector } from '@/store/hooks';
import { selectPodcastDescription } from '@/store/modules/podcast/selectors';
import { usePodcastActions } from '@/store/modules/podcast/actions';
import ImageSkeleton from '@/components/common/ImageSkeleton';

import './PodcastSidebar.css';

const PodcastSidebar: FunctionComponent = () => {
  const { id } = useParams();
  const prevId = usePrevious(id);
  const podcastDescription = useAppSelector(selectPodcastDescription);

  const { getPodcastDescription } = usePodcastActions();
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    if (id && id !== prevId) {
      getPodcastDescription(id);
    }
  }, [getPodcastDescription, id, prevId]);

  const handleImgLoad = () => {
    setIsImgLoaded(true);
  };

  return (
    <aside className="podcast-sidebar">
      <figure>
        {!isImgLoaded ? <ImageSkeleton /> : null}
        <img
          className="podcast-sidebar__img"
          src={podcastDescription?.artworkUrl600}
          alt={podcastDescription?.collectionName}
          onLoad={handleImgLoad}
        />
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
