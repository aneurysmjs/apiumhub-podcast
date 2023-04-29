import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as podcastService from '@/services/podcastService';
import { ApiMetaType } from '@/shared/types';
import { ASYNC_ACTION_TYPE } from '@/constants';
import { GET_PODCAST_REQUEST, GET_PODCAST_SUCCESS, GET_PODCAST_FAILURE } from './types';

// eslint-disable-next-line import/prefer-default-export
export function usePodcastActions() {
  const dispatch = useDispatch();

  const getPodcast = useCallback(() => {
    const candidatesMeta: ApiMetaType = {
      types: [GET_PODCAST_REQUEST, GET_PODCAST_SUCCESS, GET_PODCAST_FAILURE],
      callAPI: () => podcastService.getPodcast(),
    };

    dispatch({
      type: ASYNC_ACTION_TYPE,
      payload: {},
      meta: candidatesMeta,
    });
  }, [dispatch]);

  return { getPodcast };
}
