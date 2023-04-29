import { renderHook } from '@testing-library/react';
import { expect, it, jest } from '@jest/globals';
import * as mockReactRedux from 'react-redux';

import Wrapper from '@/store/helpers/Wrapper';
import { usePodcastActions } from './actions';

const mockDispatch = jest.fn<ReturnType<typeof mockReactRedux.useDispatch>>();

jest.mock('react-redux', () => {
  const originalModule = jest.requireActual<typeof mockReactRedux>('react-redux');

  return {
    __esModule: true,
    ...originalModule,
    useDispatch: () => mockDispatch,
  };
});

describe('podcast-actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns and object with the correct api actions', () => {
    const { result } = renderHook(() => usePodcastActions(), { wrapper: Wrapper });

    expect(result.current).toHaveProperty('getPodcast');
    expect(result.current).toHaveProperty('getPodcastDescription');
  });

  describe('getPodcast', () => {
    it('should dispatch async action for fetching podcast', () => {
      const { result } = renderHook(() => usePodcastActions(), { wrapper: Wrapper });

      const { getPodcast } = result.current;

      getPodcast();

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.any(Object),
          type: expect.stringContaining('ASYNC_ACTION_TYPE'),
        }),
      );
    });
  });

  describe('getPodcastDescription', () => {
    it('should dispatch async action for fetching podcast', () => {
      const { result } = renderHook(() => usePodcastActions(), { wrapper: Wrapper });

      const { getPodcastDescription } = result.current;

      getPodcastDescription('123');

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.any(Object),
          type: expect.stringContaining('ASYNC_ACTION_TYPE'),
        }),
      );
    });
  });
});
