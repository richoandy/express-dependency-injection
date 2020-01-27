/* eslint-disable */
const _ = require('lodash');
const documentController = require('../controllers/document.ct');

describe('LIST', () => {
  test('list document succesfully with related docs', async () => {
    const objA = {
      userId: '5e1593ce134868c187901256',
      name: 'FizzBuzz',
      email: 'richoandy@gmail.com',
      phoneNumber: '08123456789',
      address: 'Jalan Kedoya',
      ktpNumber: '01234567890',
      npwpNumber: '01234567890ABC',
      passportNumber: 'ABC0123456789',
      version: 1,
      refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
      createdAt: '2020-01-09T12:53:51.792Z',
      updatedAt: '2020-01-09T12:53:51.792Z',
    };

    const objB = {
      userId: '5e1593ce134868c187901256',
      name: 'FizzBuzz',
      email: 'richoandy@gmail.com',
      phoneNumber: '08123456789',
      address: 'Jalan Kedoya',
      ktpNumber: '01234567890',
      npwpNumber: '01234567890ABC',
      passportNumber: 'ABC0123456789',
      version: 2,
      refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
      createdAt: '2020-01-09T12:53:51.792Z',
      updatedAt: '2020-01-09T12:53:51.792Z',
    };
    const documentRepo = {
      list: () => Promise.resolve([
        objB,
      ]),
      page: () => Promise.resolve([
        objA,
      ]),
    };

    const document = documentController(documentRepo);

    const req = {
      query: {
        page: 1,
        limit: 100,
        sort: 'createdAt',
        type: 'ascending',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success list documents');
        expect(result.data).not.toBeNull();
        expect(result.data).toEqual([_.set(objB, 'histories', [objA])]);
        expect(result.meta.total).toEqual(1);
        expect(result.meta.page).toEqual(1);
        expect(result.meta.limit).toEqual(100);
        expect(result.meta.sort).toEqual('createdAt');
        expect(result.meta.type).toEqual('ascending');
        return result;
      },
    };

    await document.list(req, res);
  });

  test('list document succesfully without related docs', async () => {
    const objA = {
      userId: '5e1593ce134868c187901256',
      name: 'FizzBuzz',
      email: 'richoandy@gmail.com',
      phoneNumber: '08123456789',
      address: 'Jalan Kedoya',
      ktpNumber: '01234567890',
      npwpNumber: '01234567890ABC',
      passportNumber: 'ABC0123456789',
      version: 1,
      refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
      createdAt: '2020-01-09T12:53:51.792Z',
      updatedAt: '2020-01-09T12:53:51.792Z',
    };

    const objB = {
      userId: '5e1593ce134868c187901256',
      name: 'FizzBuzz',
      email: 'richoandy@gmail.com',
      phoneNumber: '08123456789',
      address: 'Jalan Kedoya',
      ktpNumber: '01234567890',
      npwpNumber: '01234567890ABC',
      passportNumber: 'ABC0123456789',
      version: 2,
      refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
      createdAt: '2020-01-09T12:53:51.792Z',
      updatedAt: '2020-01-09T12:53:51.792Z',
    };
    const documentRepo = {
      list: () => Promise.resolve([
      ]),
      page: () => Promise.resolve([
        objA
      ]),
    };

    const document = documentController(documentRepo);

    const req = {
      query: {
        page: 1,
        limit: 100,
        sort: 'createdAt',
        type: 'ascending',
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success list documents');
        expect(result.data).not.toBeNull();
        expect(result.data).toEqual([_.set(objA, 'histories', [])]);
        expect(result.meta.total).toEqual(0);
        expect(result.meta.page).toEqual(1);
        expect(result.meta.limit).toEqual(100);
        expect(result.meta.sort).toEqual('createdAt');
        expect(result.meta.type).toEqual('ascending');
        return result;
      },
    };

    await document.list(req, res);
  });

  test('fail to list document', async () => {
    const documentRepo = {
      list: () => Promise.reject({}),
    };

    const document = documentController(documentRepo);

    const req = {};

    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.errorCode).toEqual('ERR-DOC-002');
        expect(result.message).toEqual('fail to list documents');
        return result;
      },
    };

    await document.list(req, res);
  });
});

describe('GET', () => {
  test('get document succesfully', async () => {
    const documentRepo = {
      getOr: () => Promise.resolve([{
        userId: '5e1593ce134868c187901256',
        name: 'FizzBuzz',
        email: 'fizzbuzz@gmail.com',
        phoneNumber: '08123456789',
        address: 'fizzbuzz street',
        ktpNumber: '01234567890',
        npwpNumber: '01234567890ABC',
        passportNumber: 'ABC0123456789',
        version: 2,
        refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
        createdAt: '2020-01-09T12:53:51.792Z',
        updatedAt: '2020-01-09T12:53:51.792Z',
      }]),
      list: () => Promise.resolve([{
        userId: '5e1593ce134868c187901256',
        name: 'FizzBuzz',
        email: 'richoandy@gmail.com',
        phoneNumber: '08123456789',
        address: 'Jalan Kedoya',
        ktpNumber: '01234567890',
        npwpNumber: '01234567890ABC',
        passportNumber: 'ABC0123456789',
        version: 1,
        refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
        createdAt: '2020-01-09T12:53:51.792Z',
        updatedAt: '2020-01-09T12:53:51.792Z',
      }]),
    };
    const document = documentController(documentRepo);

    const req = null;

    const exampleData = [{
      userId: '5e1593ce134868c187901256',
      name: 'FizzBuzz',
      email: 'fizzbuzz@gmail.com',
      phoneNumber: '08123456789',
      address: 'fizzbuzz street',
      ktpNumber: '01234567890',
      npwpNumber: '01234567890ABC',
      passportNumber: 'ABC0123456789',
      version: 2,
      refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
      createdAt: '2020-01-09T12:53:51.792Z',
      updatedAt: '2020-01-09T12:53:51.792Z',
      relatedDocuments: [{
        userId: '5e1593ce134868c187901256',
        name: 'FizzBuzz',
        email: 'richoandy@gmail.com',
        phoneNumber: '08123456789',
        address: 'Jalan Kedoya',
        ktpNumber: '01234567890',
        npwpNumber: '01234567890ABC',
        passportNumber: 'ABC0123456789',
        version: 1,
        refNumber: '5e1593ce134868c187901256-BRzyxNEoOu-2020-01-09T19:36:05+07:00',
        createdAt: '2020-01-09T12:53:51.792Z',
        updatedAt: '2020-01-09T12:53:51.792Z',
      }],
    }];

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success get documents');
        expect(result.data).toEqual(exampleData);
        return result;
      },
    };

    await document.get(req, res);
  });

  test('fail to get document', async () => {
    const documentRepo = {
      getOr: () => Promise.reject({}),
    };

    const document = documentController(documentRepo);

    const req = null;
    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.errorCode).toEqual('ERR-DOC-003');
        expect(result.message).toEqual('fail to get document');
        return result;
      },
    };

    await document.get(req, res);
  });
});

describe('CREATE', () => {
  test('create document succesfully', async () => {
    const documentRepo = {
      create: () => Promise.resolve({
        __v: 0,
        updatedAt: '2020-01-09T06:43:51.398Z',
        createdAt: '2020-01-09T06:43:51.398Z',
        userId: '5e1593ce134868c187901256',
        name: 'Richo Andy Bong',
        email: 'richoandy@gmail.com',
        phoneNumber: '08123456789',
        address: 'Jalan Kedoya',
        ktpNumber: '01234567890',
        npwpNumber: '01234567890ABC',
        passportNumber: 'ABC0123456789',
        _id: '5e16cba747c876e8f35ff96b',
        isArchived: false,
      }),
    };

    const document = documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(201);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success create document');
        return result;
      },
    };

    await document.create(req, res);
  });

  test('fail to create document', async () => {
    const documentRepo = {
      create: () => Promise.reject(),
    };

    const document = documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('fail to create document');
        expect(result.errorCode).toEqual('ERR-DOC-001');
        return result;
      },
    };

    await document.create(req, res);
  });
});

describe('UPDATE', () => {
  test('update document succesfully', async () => {
    const documentRepo = {
      list: () => Promise.resolve(['foobar']),
      create: () => Promise.resolve(),
    };

    const document = await documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },

      json(result) {
        expect(result.message).toEqual('success update document');
        return result;
      },
    };

    await document.update(req, res);
  });

  test('no document matched refNumber when doing update', async () => {
    const documentRepo = {
      list: () => Promise.resolve(),
      create: () => Promise.resolve(),
    };

    const document = await documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(400);
        return this;
      },
      json(result) {
        expect(result.errorCode).toEqual(('ERR-DOC-006'));
        expect(result.message).toEqual('documents with refNumber do not exist');
        return result;
      },
    };

    await document.update(req, res);
  });

  test('fail to update document', async () => {
    const documentRepo = {
      update: () => Promise.reject(),
    };

    const document = await documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },

      json(result) {
        expect(result.message).toEqual('fail to update document');
        expect(result.errorCode).toEqual('ERR-DOC-004');
        return result;
      },
    };

    await document.update(req, res);
  });
});

describe('REMOVE', () => {
  test('remove document succesfully / update isArchived to TRUE', async () => {
    const documentRepo = {
      update: () => Promise.resolve(),
    };

    const document = documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success soft-delete document');
        return result;
      },
    };

    await document.remove(req, res);
  });

  test('fail to remove document / update isArchived to true', async () => {
    const documentRepo = {
      update: () => Promise.reject(),
    };

    const document = documentController(documentRepo);

    const req = null;

    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('fail to delete document');
        expect(result.errorCode).toEqual('ERR-DOC-005');
        return result;
      },
    };

    await document.remove(req, res);
  });
});

describe('CLEANUP', () => {
  test('delete document permanently', async () => {
    const documentRepo = {
      list: () => Promise.resolve([]),
      remove: () => Promise.resolve(),
    };

    const document = documentController(documentRepo);

    const req = {
      query: {
        date: new Date('2019-12-12'),
      },
    };

    const res = {
      status(status) {
        expect(status).toEqual(200);
        return this;
      },
      json(result) {
        expect(result.message).toEqual('success perma-delete documents');
        return result;
      },
    };
    await document.cleanup(req, res);
  });

  test('fail to permanent delete document', async () => {
    const documentRepo = {
      remove: () => Promise.resolve(),
    };

    const document = documentController(documentRepo);

    const req = null;
    const res = {
      status(status) {
        expect(status).toEqual(500);
        return this;
      },
      json(result) {
        expect(result.errorCode).toEqual('ERR-DOC-007');
        expect(result.message).toEqual('fail to permadelete documents');
        return result;
      },
    };

    await document.cleanup(req, res);
  });
});
