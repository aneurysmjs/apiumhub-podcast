import { type FunctionComponent } from 'react';
import { Podcast } from '@/store/modules/podcast/types';

import './PodcastItem.css';

interface PodcastItemProps {
  podcast: Podcast;
}

const PodcastItem: FunctionComponent<PodcastItemProps> = ({ podcast }) => {
  return (
    <article
      className="podcast-item"
      data-podcast-id={podcast.id.attributes['im:id']}
      data-testid="podcast-item"
    >
      <img
        className="podcast-item__img"
        src={podcast['im:image'][2].label}
        alt={podcast.title.label}
      />
      <header className="podcast-item__title">{podcast['im:name'].label}</header>
      <footer className="podcast-item__description">
        <span>Author:</span> {podcast['im:artist'].label}
      </footer>
    </article>
  );
};

export default PodcastItem;
