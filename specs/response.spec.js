/* eslint-disable */
const response = require('../utils/response');

describe('success', () => {
  test('return success response succesfully', () => {
    const res = {
      status(status) {
        expect(status).toEqual(201);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success');
        expect(result.data).toEqual({ person: 'John Doe' });
        expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
        return result;
      },
    };

    response.success(res, 201, 'success', { person: 'John Doe' }, { page: 1, limit: 10, total: 1 });
  });
});

describe('fail', () => {
  test('return fail response succesfully', () => {
    const res = {
      status(status) {
        expect(status).toEqual(404);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('unavailable token');
        expect(result.errorCode).toEqual('ERR-AUTH-001');
        expect(result.error).toEqual({ error: 'error' });
        return result;
      },
    };

    response.fail(res, 404, 'ERR-AUTH-001', { error: 'error' });
  });
});
