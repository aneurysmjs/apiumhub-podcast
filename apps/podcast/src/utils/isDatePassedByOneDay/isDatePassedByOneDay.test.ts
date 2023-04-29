import { expect, it } from '@jest/globals';

import isDatePassedByOneDay from './isDatePassedByOneDay';

describe('isDatePassedByOneDay', () => {
  it('returns true when date to check is passed exactly by one day', () => {
    const currentDate = '2023-04-28T13:31:03.934Z';
    const dateToCheck = '2023-04-29T13:31:03.934Z';

    expect(isDatePassedByOneDay(currentDate, dateToCheck)).toBe(true);
  });

  it('returns false when date to check is less than or equal current date', () => {
    const currentDate = '2023-04-29T13:31:03.934Z';
    const dateToCheck = '2023-04-29T13:31:03.934Z';

    expect(isDatePassedByOneDay(currentDate, dateToCheck)).toBe(false);
  });

  it('throws when current date is not valid ISO string', () => {
    const currentDate = '2023-04-29T13:31:03.934';
    const dateToCheck = '2023-04-29T13:31:03.934Z';

    expect(() => {
      isDatePassedByOneDay(currentDate, dateToCheck);
    }).toThrow('current date is not valid ISO string date');
  });

  it('throws when date to check is not valid ISO string', () => {
    const currentDate = '2023-04-29T13:31:03.934Z';
    const dateToCheck = '2023-04-29T13:31:03.934';

    expect(() => {
      isDatePassedByOneDay(currentDate, dateToCheck);
    }).toThrow('date to check is not valid ISO string date');
  });
});
