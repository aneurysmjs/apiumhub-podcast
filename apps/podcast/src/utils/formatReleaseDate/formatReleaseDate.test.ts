import formatReleaseDate from './formatReleaseDate';

describe('formatReleaseDate', () => {
  it('formats string ISO 8601 to dd/mm/yyyy', () => {
    expect(formatReleaseDate('2023-04-22T00:00:00-07:00')).toBe('22/04/2023');
  });
});
