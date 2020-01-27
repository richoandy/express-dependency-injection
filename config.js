module.exports = {
  development: {
    mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/document-manager',
    salt: process.env.SALT || 10,
    jwt: process.env.JWT || 'secret',
    cronKey: process.env.CRON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb3VyY2UiOiJ4ZW5kaXQtY3JvbiJ9.BDe0GhHn-0OI6KYSKNSTzdrYCtP3ZSdqOKh3JDOftn0',
    cronUrl: process.env.CRON_URL || 'http://localhost:3000/api',
  },

  production: {
    mongodbUrl: process.env.MONGODB_URL,
    salt: process.env.SALT,
    jwt: process.env.JWT,
    cronKey: process.env.CRON_KEY,
    cronUrl: process.env.CRON_URL,
  },

  getConfig() {
    return this[process.env.ENV || 'development'];
  },
};
