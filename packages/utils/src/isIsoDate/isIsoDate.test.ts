import isIsoDate from './isIsoDate';

describe('isIsoDate', () => {
  it('checks given date is a valid ISO 8601', () => {
    expect(isIsoDate('2023-04-28T13:31:03.934Z')).toBe(true);
    expect(isIsoDate('2023-04-28T13:31:03.934')).toBe(false);
    expect(isIsoDate('2023-04-28')).toBe(false);
  });
});
