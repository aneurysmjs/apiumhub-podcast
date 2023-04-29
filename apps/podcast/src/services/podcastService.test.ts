import axios from 'axios';
import { expect, it, jest } from '@jest/globals';

import { getPodcast, getPodcastDescription } from './podcastService';
import podcastMockData from './podcastMockData';
import podcastDescriptionMockData from './podcastDescriptionMockData';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('podcastService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPodcast', () => {
    it('resolves podcast data', async () => {
      mockAxios.get.mockResolvedValue(podcastMockData);
      const response = await getPodcast();

      expect(response).toStrictEqual(podcastMockData);
    });

    it('rejects due bad request', async () => {
      const networkError = new Error('Network Error');
      mockAxios.get.mockRejectedValue(networkError);

      await expect(getPodcast()).rejects.toStrictEqual(networkError);
    });
  });

  describe('getPodcastDescription', () => {
    it('resolves podcast description data', async () => {
      mockAxios.get.mockResolvedValue(podcastDescriptionMockData);
      const response = await getPodcastDescription('123456');

      const [podcastDescription] = response.results;
      expect(podcastDescription).toHaveProperty('artistName');
    });

    it('rejects due bad request', async () => {
      const networkError = new Error('Network Error');
      mockAxios.get.mockRejectedValue(networkError);

      await expect(getPodcastDescription('123456')).rejects.toStrictEqual(networkError);
    });
  });
});
