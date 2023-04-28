import generateApiActions from './generateApiActions';

describe('generateApiActions', () => {
  it('generates a tuple for "SUCCESS", "REQUEST", "FAILURE" with specified HTTP verb', () => {
    expect(generateApiActions('foo', 'GET')).toStrictEqual([
      'GET_FOO_REQUEST',
      'GET_FOO_SUCCESS',
      'GET_FOO_FAILURE',
    ]);
  });
});
