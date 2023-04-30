import { toKeyedObject } from '@apiumhub/utils';

import {
  type PodcastActions,
  type PodcastState,
  GET_PODCAST_SUCCESS,
  GET_PODCAST_DESCRIPTION_SUCCESS,
} from './types';

export const initialState = {
  podcastList: {},
  podcastDescription: {},
  podcastEpisodes: {},
} as PodcastState;

// eslint-disable-next-line default-param-last
export function podcastReducer(state = initialState, action: PodcastActions) {
  if (action.type === GET_PODCAST_SUCCESS) {
    return {
      ...state,
      podcastList: toKeyedObject(action.payload.feed.entry, ['id', 'attributes', 'im:id']),
    };
  }

  if (action.type === GET_PODCAST_DESCRIPTION_SUCCESS) {
    const [podcastDescription, ...episodes] = action.payload.results;

    return {
      ...state,
      podcastDescription,
      podcastEpisodes: toKeyedObject(episodes, ['trackId']),
    };
  }

  return state;
}
