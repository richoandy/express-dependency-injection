/* eslint-disable */
const userController = require('../controllers/user.ct');

describe('REGISTER', () => {
  test('register user succesfully', async () => {
    const userRepo = {
      get: () => Promise.resolve({}),

      create: () => Promise.resolve({
        username: 'johndoe',
        password: '$2b$10$DZs./x/84QYXK05CPCfAjeyXqt3QiGvrIbxT27Isu6I5rZDKe3aju',
      }),
    };

    const user = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'johndoe',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(201);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success register user');
        expect(result.data.username).toEqual(req.body.username);
        expect(result.data.password).not.toEqual(req.body.password);
        return result;
      },
    };

    await user.register(req, res);
  });

  test('fail to register user with existing username', async () => {
    const userRepo = {
      get: () => Promise.resolve({
        username: 'johndoe',
      }),
    };

    const user = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'johndoe',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(400);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('username already exists');
        expect(result.errorCode).toEqual('ERR-USER-001');
        return result;
      },
    };

    await user.register(req, res);
  });

  test('fail to register user from server', async () => {
    const userRepo = {
      get: () => Promise.reject({}),
      create: () => Promise.reject({}),
    };

    const { register } = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'johndoe',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('fail to create user');
        expect(result.errorCode).toEqual('ERR-USER-002');
        return this;
      },
    };
  });
});

describe('LOGIN', () => {
  test('login succesfully', async () => {
    const userRepo = {
      get: () => Promise.resolve({
        username: 'johndoe',
        password: '$2b$10$HVlRoPSsd/9BijJ1.LNs9OMIb/48V1LZnnhI..b/lbut9IrWW7cZe',
      }),
    };
    const user = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'johndoe',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success log in user');
        expect(result.data.token).not.toBeNull();
        return result;
      },
    };

    await user.login(req, res);
  });

  test('incorrect username', async () => {
    const userRepo = {
      get: () => Promise.resolve({}),
    };
    const user = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'johndoe',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(400);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('incorrect username');
        expect(result.errorCode).toEqual('ERR-USER-004');
        return result;
      },
    };

    await user.login(req, res);
  });

  test('incorrect password', async () => {
    const userRepo = {
      get: () => Promise.resolve({
        username: 'johndoe',
        password: '$2b$10$HVlRoPSsd/9BijJ1.LNs9OMIb/48V1LZnnhI..b/lbut9IrWW7cZe',
      }),
    };

    const user = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'foobar',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(400);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('incorrect password');
        expect(result.errorCode).toEqual('ERR-USER-005');
        return result;
      },
    };

    await user.login(req, res);
  });

  test('fail to log in user', async () => {
    const userRepo = {
      get: () => Promise.resolve({}),
    };

    const user = userController(userRepo);

    const req = {
      body: {
        username: 'johndoe',
        password: 'foobar',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('fail to log in user');
        expect(result.errorCode).toEqual('ERR-USER-003');
        return result;
      },
    };

    await user.login(req, res);
  });
});
