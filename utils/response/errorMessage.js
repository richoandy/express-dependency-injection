const errorMessage = {
  // - AUTH
  'ERR-AUTH-001': 'unavailable token',
  'ERR-AUTH-002': 'invalid token',
  'ERR-AUTH-003': 'incoming request is not from xendit-cron',

  // - USER
  'ERR-USER-001': 'username already exists',
  'ERR-USER-002': 'fail to create user',
  'ERR-USER-003': 'fail to log in user',
  'ERR-USER-004': 'incorrect username',
  'ERR-USER-005': 'incorrect password',

  // - DOCUMENT
  'ERR-DOC-001': 'fail to create document',
  'ERR-DOC-002': 'fail to list documents',
  'ERR-DOC-003': 'fail to get document',
  'ERR-DOC-004': 'fail to update document',
  'ERR-DOC-005': 'fail to delete document',
  'ERR-DOC-006': 'documents with refNumber do not exist',
  'ERR-DOC-007': 'fail to permadelete documents',
};

module.exports = errorMessage;
