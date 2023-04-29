import axios from 'axios';

import type { PodcastResponse } from '@/store/modules/podcast/types';

const PODCAST_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

// eslint-disable-next-line import/prefer-default-export
export const getPodcast = (): Promise<PodcastResponse> => axios.get(PODCAST_URL);
