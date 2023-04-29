import formatMilliseconds from './formatMilliseconds';

describe('formatMilliseconds', () => {
  it('formats milliseconds to HH:mm:ss', () => {
    expect(formatMilliseconds(3672000)).toBe('01:01:21');
  });
});
