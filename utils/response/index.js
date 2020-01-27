const errorMessage = require('./errorMessage');

module.exports = {
  success(res, code = 200, message = '', data = {}, meta = {}) {
    return res.status(code).json({
      message: `${message}`,
      data,
      meta,
    });
  },

  fail(res, code = 500, errorCode, error = '') {
    return res.status(code).json({
      errorCode,
      message: errorMessage[errorCode],
      error,
    });
  },
};
