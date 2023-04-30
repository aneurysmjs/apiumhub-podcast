import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { selectPodcastEpisodeById } from '@/store/modules/podcast/selectors';

import './PodcastEpisode.css';

const PodcastEpisode = () => {
  const { episodeId } = useParams();
  const podcastDescription = useAppSelector(selectPodcastEpisodeById(episodeId as string));

  return (
    <article className="podcast-episode">
      {podcastDescription ? (
        <>
          <header>
            <h4 className="podcast-episode__title">{podcastDescription.trackName}</h4>
          </header>
          <p>{podcastDescription.description}</p>
          <footer>
            <audio
              data-testid="player"
              className="podcast-episode__player"
              controls
              src={podcastDescription.episodeUrl}
            >
              <track kind="captions" />
            </audio>
          </footer>
        </>
      ) : null}
    </article>
  );
};

export default PodcastEpisode;
