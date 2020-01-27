const _ = require('lodash');
const Document = require('../models/document.model');

module.exports = {
  async get(params) {
    return Document.findOne(params);
  },

  async getOr(keys, userId) {
    return Document.find({ $or: keys })
      .where({ userId, isArchived: false });
  },

  async list(params, sort = { createdAt: 'descending' }) {
    return Document.find(params)
      .sort(sort);
  },

  async page(params, { limit, skip }, sort = { createdAt: -1 }) {
    return Document
      .find(params)
      .limit(limit)
      .skip(skip)
      .sort(sort);
  },

  async create(data) {
    return Document.create({
      userId: _.get(data, 'userId'),
      name: _.get(data, 'name'),
      email: _.get(data, 'email'),
      phoneNumber: _.get(data, 'phoneNumber'),
      address: _.get(data, 'address'),
      ktpNumber: _.get(data, 'ktpNumber'),
      npwpNumber: _.get(data, 'npwpNumber'),
      passportNumber: _.get(data, 'passportNumber'),
      version: _.get(data, 'version'),
      refNumber: _.get(data, 'refNumber'),
    });
  },

  async update(params, data) {
    return Document.updateMany(params, {
      $set: data,
    });
  },

  async remove(id) {
    return Document.findByIdAndRemove(id);
  },
};
