/* eslint-disable */
const helper = require('../utils/helpers');

describe('helper', () => {
  test('return refNumber succesfully', () => {
    const [userId, random, date] = helper.generateDocumentKey('12345', '20191212').split('-');
    expect(userId).toEqual('12345');
    expect(random).toHaveLength(10);
    expect(date).toEqual('20191212');
  });
});
