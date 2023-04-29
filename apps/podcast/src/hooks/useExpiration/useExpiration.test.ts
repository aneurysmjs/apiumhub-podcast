import { expect, it, jest } from '@jest/globals'
import { renderHook } from '@testing-library/react';

import useExpiration, { EXPIRATION_KEY } from './useExpiration';

describe('useExpiration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("should save today's date if it not on localStorage", () => {
    expect(localStorage.getItem(EXPIRATION_KEY)).toBeNull();

    const cb = jest.fn();

    const currentDate = '2023-04-29T16:49:06.253Z';

    const { result } = renderHook(() => useExpiration(currentDate, cb));
    const { savedDate } = result.current;

    expect(cb).not.toHaveBeenCalled();

    expect(localStorage.getItem(EXPIRATION_KEY)).toBe(savedDate);
  });

  it('should call callback if date has passed by one day', () => {
    localStorage.setItem(EXPIRATION_KEY, '2023-04-29T16:49:06.253Z');
    const setItemSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    const cb = jest.fn();

    const currentDate = '2023-04-30T16:49:06.253Z';

    const { result } = renderHook(() => useExpiration(currentDate, cb));

    expect(setItemSpy).toHaveBeenCalledTimes(1);

    expect(cb).toHaveBeenCalled();

    expect(result.current.savedDate).toBe(currentDate);
  });
});
