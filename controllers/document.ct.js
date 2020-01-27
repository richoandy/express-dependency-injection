const _ = require('lodash');
const moment = require('moment');
const response = require('../utils/response');
const helpers = require('../utils/helpers');

module.exports = (documentRepo) => ({
  async list(req, res) {
    try {
      const userId = _.get(req, 'meta.userId');
      const query = _.get(req, 'query');
      const page = parseInt(_.get(query, 'page', 1), 10);
      const limit = parseInt(_.get(query, 'limit', 100), 10);
      const sort = _.get(query, 'sort', 'createdAt');
      const type = _.get(query, 'type', 'descending');

      const criteria = {
        $and:
            [
              { userId },
              { isArchived: false },
              { version: 1 },
            ],
      };

      const total = await documentRepo.list(criteria);

      const documents = await documentRepo.page(
        criteria,
        { limit, skip: (page - 1) * limit },
        { [sort]: type },
      );

      const result = await Promise.all(documents.map(async (doc) => {
        let temp = doc;
        const historyCriteria = {
          $and:
            [
              { userId },
              { isArchived: false },
              { version: { $ne: 1 } },
              { refNumber: doc.refNumber },
            ],
        };

        let histories = await documentRepo.list(historyCriteria);

        if (!_.isEmpty(histories)) {
          temp = histories[0]; /* eslint-disable-line */
          histories = histories.slice(1);
          histories.push(doc);
        }

        return {
          userId: _.get(temp, 'userId'),
          name: _.get(temp, 'name'),
          email: _.get(temp, 'email'),
          phoneNumber: _.get(temp, 'phoneNumber'),
          address: _.get(temp, 'address'),
          ktpNumber: _.get(temp, 'ktpNumber'),
          npwpNumber: _.get(temp, 'npwpNumber'),
          passportNumber: _.get(temp, 'passportNumber'),
          version: _.get(temp, 'version'),
          refNumber: _.get(temp, 'refNumber'),
          createdAt: _.get(temp, 'createdAt'),
          updatedAt: _.get(temp, 'updatedAt'),
          histories,
        };
      }));

      return response.success(res, 200, 'success list documents', result,
        {
          page, limit, total: total.length, sort, type,
        });
    } catch (error) {
      return response.fail(res, 500, 'ERR-DOC-002', error);
    }
  },

  async get(req, res) {
    try {
      const userId = _.get(req, 'meta.userId');
      const value = _.get(req, 'params.value');

      const documents = await documentRepo.getOr(
        [
          { name: { $regex: value, $options: 'i' } },
          { email: { $regex: value, $options: 'i' } },
        ],
        userId,
      );

      const result = await Promise.all(documents.map(async (doc) => {
        const relatedDocumentCriteria = {
          $and:
                [
                  { userId },
                  { isArchived: false },
                  { version: { $ne: doc.version } },
                  { refNumber: doc.refNumber },
                ],
        };
        const relatedDocuments = await documentRepo.list(relatedDocumentCriteria);
        return {
          userId: _.get(doc, 'userId'),
          name: _.get(doc, 'name'),
          email: _.get(doc, 'email'),
          phoneNumber: _.get(doc, 'phoneNumber'),
          address: _.get(doc, 'address'),
          ktpNumber: _.get(doc, 'ktpNumber'),
          npwpNumber: _.get(doc, 'npwpNumber'),
          passportNumber: _.get(doc, 'passportNumber'),
          version: _.get(doc, 'version'),
          refNumber: _.get(doc, 'refNumber'),
          createdAt: _.get(doc, 'createdAt'),
          updatedAt: _.get(doc, 'updatedAt'),
          relatedDocuments,
        };
      }));

      return response.success(res, 200, 'success get documents', result);
    } catch (error) {
      return response.fail(res, 500, 'ERR-DOC-003', error);
    }
  },

  async create(req, res) {
    try {
      const userId = _.get(req, 'meta.userId');
      const body = _.get(req, 'body');
      const name = _.get(body, 'name');
      const email = _.get(body, 'email');
      const phoneNumber = _.get(body, 'phoneNumber');
      const address = _.get(body, 'address');
      const ktpNumber = _.get(body, 'ktpNumber');
      const npwpNumber = _.get(body, 'npwpNumber');
      const passportNumber = _.get(body, 'passportNumber');

      const newDoc = await documentRepo.create({
        userId,
        name,
        email,
        phoneNumber,
        address,
        ktpNumber,
        npwpNumber,
        passportNumber,
        version: 1,
        refNumber: helpers.generateDocumentKey(userId, moment(new Date()).format()),
      });

      return response.success(res, 201, 'success create document', newDoc);
    } catch (error) {
      return response.fail(res, 500, 'ERR-DOC-001', error);
    }
  },

  async update(req, res) {
    try {
      const userId = _.get(req, 'meta.userId');
      const refNumber = _.get(req, 'params.ref');
      const body = _.get(req, 'body');
      const name = _.get(body, 'name');
      const email = _.get(body, 'email');
      const phoneNumber = _.get(body, 'phoneNumber');
      const address = _.get(body, 'address');
      const ktpNumber = _.get(body, 'ktpNumber');
      const npwpNumber = _.get(body, 'npwpNumber');
      const passportNumber = _.get(body, 'passportNumber');

      const docs = await documentRepo.list(
        { userId, refNumber },
        { version: -1 },
      );

      if (_.isEmpty(docs)) {
        return response.fail(res, 400, 'ERR-DOC-006');
      }

      const newVersionDoc = await documentRepo.create({
        userId,
        name,
        email,
        phoneNumber,
        address,
        ktpNumber,
        npwpNumber,
        passportNumber,
        version: docs[0].version + 1,
        refNumber,
      });

      return response.success(res, 200, 'success update document', newVersionDoc);
    } catch (error) {
      return response.fail(res, 500, 'ERR-DOC-004', error);
    }
  },

  async remove(req, res) {
    try {
      const refNumber = _.get(req, 'params.ref');
      const archivedDate = new Date();
      const deletedDoc = await documentRepo.update({ refNumber }, {
        isArchived: true,
        archivedDate,
      });

      return response.success(res, 200, 'success soft-delete document', deletedDoc);
    } catch (error) {
      return response.fail(res, 500, 'ERR-DOC-005', error);
    }
  },

  async cleanup(req, res) {
    try {
      const date = new Date(_.get(req, 'query.date', new Date()));
      date.setDate(date.getDate() - 3);
      const archivedDocuments = await documentRepo.list({
        isArchived: true,
        archivedDate: { $lt: date },
      });

      const result = await Promise.all(archivedDocuments.map(async (doc) => documentRepo.remove(_.get(doc, '_id'))));

      return response.success(res, 200, 'success perma-delete documents', result);
    } catch (error) {
      return response.fail(res, 500, 'ERR-DOC-007', error);
    }
  },
});
