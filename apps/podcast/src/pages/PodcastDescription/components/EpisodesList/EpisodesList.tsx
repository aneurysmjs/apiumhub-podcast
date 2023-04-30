import { type FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { formatMilliseconds } from '@apiumhub/utils';
import { useAppSelector } from '@/store/hooks';
import { selectPodcastEpisodes } from '@/store/modules/podcast/selectors';
import formatReleaseDate from '@/utils/formatReleaseDate';

import './EpisodesList.css';

const EpisodesList: FunctionComponent = () => {
  const { t } = useTranslation();
  const episodes = useAppSelector(selectPodcastEpisodes);

  return (
    <div className="episode-list">
      <div className="episode-list__controls">
        <div className="episode-list__title">
          <span>{t('podcast.episodes')}: </span>
          {episodes.length}
        </div>
      </div>

      <table className="table table--zebra">
        <thead className="table__head">
          <tr>
            <th className="table__th">{t('podcast.title')}</th>
            <th className="table__th">{t('podcast.date')}</th>
            <th className="table__th">{t('podcast.duration')}</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode) => (
            <tr key={episode.trackId} className="table__tr cursor-pointer" data-testid="table-row">
              <td className="table__td">{episode.trackName}</td>
              <td className="table__td">{formatReleaseDate(episode.releaseDate)}</td>
              <td className="table__td">{formatMilliseconds(episode.trackTimeMillis)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodesList;
