import { type FunctionComponent, type ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import isEmpty from 'ramda/src/isEmpty';

import { useAppSelector } from '@/store/hooks';
import { loadingSelector } from '@/store/helpers/selectors';
import { usePodcastActions } from '@/store/modules/podcast/actions';
import PodcastItem from '@/pages/Home/components/PodcastItem';
import { selectPodcast } from '@/store/modules/podcast/selectors';
import { useFilterable, useDebounce } from '@apiumhub/hooks';
import { Podcast } from '@/store/modules/podcast/types';

import './Home.css';

const searchByTitle = (item: Podcast, filterVal: string) =>
  item.title.label.toLowerCase().includes(filterVal.toLowerCase());

const Home: FunctionComponent = () => {
  const { t } = useTranslation();
  const { getPodcast } = usePodcastActions();
  const podcast = useAppSelector(selectPodcast);
  const [search, setSearch] = useState('');
  const filteredPodcast = useFilterable(podcast, search, searchByTitle);
  const isLoading = useAppSelector(loadingSelector(['GET_PODCAST']));

  useEffect(() => {
    getPodcast();
  }, [getPodcast]);

  const handleKeydown = useDebounce<ChangeEvent<HTMLInputElement>>((evt) => {
    if (evt) {
      const { value } = evt.target as HTMLInputElement;

      setSearch(value);
    }
  });

  const shouldDisplayNoResultsText = isLoading === false && search && isEmpty(filteredPodcast);

  return (
    <section className="home">
      <div className="home__content">
        <div className="home__podcasts-search">
          <input
            data-testid="input-search"
            placeholder="filter by"
            className="home__input-search"
            onChange={handleKeydown}
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="home__podcasts-list">
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
