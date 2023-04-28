import toKeyedObject from './toKeyedObject';

describe('toKeyedObject', () => {
  test('it should transform an array of objects to a keyed object', () => {
    const arr = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];

    const result = {
      1: {
        id: 1,
        name: 'a',
      },
      2: {
        id: 2,
        name: 'b',
      },
    };

    expect(toKeyedObject(arr, ['id'])).toEqual(result);
  });
});
