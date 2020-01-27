const _ = require('lodash');
const User = require('../models/user.model');

module.exports = {
  async get(key, value) {
    return User.findOne({ [key]: value });
  },

  async create(data) {
    return User.create({
      username: _.get(data, 'username'),
      password: _.get(data, 'password'),
    });
  },
};
