const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config').getConfig();
const response = require('../utils/response');

module.exports = (userRepo) => ({
  async register(req, res) {
    try {
      const body = _.get(req, 'body');
      const username = _.get(body, 'username');
      const password = _.get(body, 'password');

      const existingUser = await userRepo.get('username', username);
      if (!_.isEmpty(existingUser)) {
        return response.fail(res, 400, 'ERR-USER-001', username);
      }

      const hashPassword = bcrypt.hashSync(password, config.salt);

      const newUser = await userRepo.create({ username, password: hashPassword });

      return response.success(res, 201, 'success register user', newUser);
    } catch (error) {
      return response.fail(res, 500, ' ERR-USER-002', error);
    }
  },

  async login(req, res) {
    try {
      const body = _.get(req, 'body');
      const username = _.get(body, 'username');
      const password = _.get(body, 'password');

      const existingUser = await userRepo.get('username', username);
      if (_.isEmpty(existingUser)) {
        return response.fail(res, 400, 'ERR-USER-004', username);
      }

      const isUser = bcrypt.compareSync(password, existingUser.password);
      if (!isUser) {
        return response.fail(res, 400, 'ERR-USER-005');
      }

      const token = jwt.sign({ userId: existingUser.id, username }, config.jwt);

      return response.success(res, 200, 'success log in user', { token });
    } catch (error) {
      return response.fail(res, 500, 'ERR-USER-003', error);
    }
  },
});
