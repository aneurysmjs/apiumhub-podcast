import {
  type FunctionComponent,
  type ChangeEvent,
  type MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'ramda/src/isEmpty';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { loadingSelector } from '@/store/helpers/selectors';
import { usePodcastActions } from '@/store/modules/podcast/actions';
import PodcastItem from '@/pages/Home/components/PodcastItem';
import { selectPodcast } from '@/store/modules/podcast/selectors';
import { useFilterable, useDebounce } from '@apiumhub/hooks';
import { Podcast } from '@/store/modules/podcast/types';
import useExpiration from '@/hooks/useExpiration';

import './Home.css';

const searchByTitle = (item: Podcast, filterVal: string) =>
  item.title.label.toLowerCase().includes(filterVal.toLowerCase());

const getPodcastId = <T extends HTMLElement>(el: T | null): string | null => {
  if (el === null) {
    return null;
  }

  if (el?.dataset?.podcastId) {
    return el?.dataset.podcastId;
  }

  return getPodcastId(el.parentElement);
};

const Home: FunctionComponent = () => {
  const { t } = useTranslation();
  const { getPodcast } = usePodcastActions();
  const podcast = useAppSelector(selectPodcast);
  const [search, setSearch] = useState('');
  const filteredPodcast = useFilterable(podcast, search, searchByTitle);
  const isLoading = useAppSelector(loadingSelector(['GET_PODCAST']));
  const navigate = useNavigate();

  useEffect(() => {
    getPodcast();
  }, [getPodcast]);

  useExpiration(new Date().toISOString(), getPodcast);

  const handleChange = useDebounce<ChangeEvent<HTMLInputElement>>((evt) => {
    if (evt) {
      const { value } = evt.target as HTMLInputElement;

      setSearch(value);
    }
  });

  const handleClick = (evt: MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLDivElement;

    const id = getPodcastId(target);

    if (id) {
      navigate(`podcast/${id}`);
    }
  };

  const shouldDisplayNoResultsText = isLoading === false && search && isEmpty(filteredPodcast);

  return (
    <section className="home">
      <div className="home__content">
        <div className="home__podcasts-search">
          <input
            data-testid="input-search"
            placeholder="filter by"
            className="home__input-search"
            onChange={handleChange}
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="home__podcasts-list" onClick={handleClick}>
          {filteredPodcast.map((podcastItem) => (
            <PodcastItem key={podcastItem.id.attributes['im:id']} podcast={podcastItem} />
          ))}
        </div>
        {shouldDisplayNoResultsText ? (
          <div className="home__no-results" data-testid="no-results">
            {t('notResultsFound')} &quot;{search}&quot;
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Home;
