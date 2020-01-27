const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config').getConfig();

const { fail } = require('../utils/response');

module.exports = {
  verifyToken(req, res, next) {
    try {
      const bearerToken = _.get(req, 'headers.authorization');
      if (_.isEmpty(bearerToken)) {
        return fail(res, 403, 'ERR-AUTH-001');
      }

      const tokens = bearerToken.split(' ');

      const decodedToken = jwt.verify(tokens[1], config.jwt);
      _.set(req, 'meta', decodedToken);
      return next();
    } catch (error) {
      return fail(res, 403, 'ERR-AUTH-002');
    }
  },

  cronGuard(req, res, next) {
    try {
      const cronToken = _.get(req, 'headers.xendit-cron-key');
      if (_.isEmpty(cronToken)) {
        return fail(res, 403, 'ERR-AUTH-001');
      }
      const decodedToken = jwt.verify(cronToken, config.jwt);
      const source = _.get(decodedToken, 'source');

      if (source !== 'xendit-cron') {
        return fail(res, 403, 'ERR-AUTH-003');
      }

      return next();
    } catch (error) {
      return fail(res, 403, 'ERR-AUTH-002');
    }
  },
};
