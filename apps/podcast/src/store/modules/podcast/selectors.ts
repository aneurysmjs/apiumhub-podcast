import type { RootState } from '@/store';
import type { PodcastState, Podcast } from '@/store/modules/podcast/types';
import isNil from 'ramda/src/isNil';

export const selectPodcastState = (state: RootState): PodcastState => state.podcast;

export const selectPodcast = (state: RootState): Podcast[] =>
  Object.keys(state.podcast.podcastList).map((key) => state.podcast.podcastList[key]);

export const selectPodcastDescription = (state: RootState) => state.podcast.podcastDescription;

export const selectPodcastEpisodes = (state: RootState) => {
  const { podcastEpisodes } = state.podcast;

  if (isNil(podcastEpisodes) || Object.keys(podcastEpisodes).length === 0) {
    return [];
  }

  return Object.values(podcastEpisodes);
};
