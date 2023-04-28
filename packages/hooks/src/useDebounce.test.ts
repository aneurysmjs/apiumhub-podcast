import { renderHook } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should debounce the callback function', () => {
    const callback = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(callback, delay));

    // Call the debounced callback multiple times
    result.current();
    result.current();
    result.current();

    // Fast-forward the timers so that the debounced callback should have been called
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
