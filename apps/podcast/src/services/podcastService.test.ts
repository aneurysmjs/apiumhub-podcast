import axios from 'axios';
import { expect, it, jest } from '@jest/globals';

import { getPodcast } from './podcastService';
import podcastMockData from './podcastMockData';

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
});
