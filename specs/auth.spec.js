/* eslint-disable */
const auth = require('../middlewares/auth');

describe('VERIFY TOKEN', () => {
  test('verify token succesfully', async () => {
    const req = {
      headers: {
        authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTE1ZTQ3NWI5NjRiMWQyNDE1ODdjMTMiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1Nzg1MzY3NDB9.PJqccdaRMiP2YoRlt9spjNXB1xNtsGDutCvX15AmoUg',
      },
    };

    const res = jest.fn();
    const next = jest.fn();

    await auth.verifyToken(req, res, next);

    expect(req.meta).not.toBeNull();
    expect(next).toBeCalled();
  });

  test('unavailable token', async () => {
    const req = {
      headers: {
        authorization: null,
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(403);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('unavailable token');
        expect(result.errorCode).toEqual('ERR-AUTH-001');
        return result;
      },
    };

    auth.verifyToken(req, res);
  });

  test('invalid token', async () => {
    const req = {
      headers: {
        authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTE1ZTQ3NWI5NjRiMWQyNDE1ODdjMTMiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1Nzg1MzY3NDB9.PJqccdaRMiP2YoRlt9spjNXB1xNtsGDutCvX15AmoUa',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(403);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('invalid token');
        expect(result.errorCode).toEqual('ERR-AUTH-002');
        return result;
      },
    };

    auth.verifyToken(req, res);
  });
});

describe('CRON GUARD', () => {
  test('verify cron token succesfully', async () => {
    const req = {
      headers: {
        'xendit-cron-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJ4ZW5kaXQtY3JvbiJ9.BDe0GhHn-0OI6KYSKNSTzdrYCtP3ZSdqOKh3JDOftn0',
      },
    };

    const res = null;
    const next = jest.fn();

    await auth.cronGuard(req, res, next);

    expect(next).toBeCalled();
  });

  test('not from correct source', async () => {
    const req = {
      headers: {
        'xendit-cron-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJpbnN0YW1vbmV5In0.sABM3Ju_nQtBE8XbxjfBAs1lk6glY7W_zZe8JXUwvWs',
      },
    };
    const res = {
      status(status) {
        expect(status).toEqual(403);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('incoming request is not from xendit-cron');
        expect(result.errorCode).toEqual('ERR-AUTH-003');
        return result;
      },
    };

    auth.cronGuard(req, res);
  });

  test('invalid token', async () => {
    const req = {
      headers: {
        'xendit-cron-key': 'abcde',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(403);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('invalid token');
        expect(result.errorCode).toEqual('ERR-AUTH-002');
        return result;
      },
    };

    auth.cronGuard(req, res);
  });

  test('unavailable token', async () => {
    const req = {
      headers: {
        'xendit-cron-key': null,
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(403);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('unavailable token');
        expect(result.errorCode).toEqual('ERR-AUTH-001');
        return result;
      },
    };

    auth.cronGuard(req, res);
  });
});
