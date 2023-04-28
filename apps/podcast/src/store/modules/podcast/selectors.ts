import type { RootState } from '@/store';
import type { PodcastState, Podcast } from '@/store/modules/podcast/types';

export const selectPodcastState = (state: RootState): PodcastState => state.podcast;

export const selectPodcast = (state: RootState): Podcast[] =>
  Object.keys(state.podcast.podcastList).map((key) => state.podcast.podcastList[key]);
