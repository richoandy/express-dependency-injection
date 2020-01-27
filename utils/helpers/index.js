const random = require('randomstring');

module.exports = {
  generateDocumentKey(userId, dateNow) {
    return `${userId}-${random.generate(10)}-${dateNow}`;
  },
};
