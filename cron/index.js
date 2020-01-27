const cron = require('node-cron');
const axios = require('axios');
const config = require('../config').getConfig();

module.exports = {
  documentCleanup() {
    cron.schedule('0 0 * * *', async () => {
      const today = new Date();
      const result = await axios.delete(`${config.cronUrl}/docs/cleanup?date=${today}`, {
        headers: {
          'xendit-cron-key': config.cronKey,
        },
      });
      console.log(`===== CLEANUP FOR ${today} is DONE, ROWS AFFECTED: ${result.data.data.length} =====`);
    });
  },
};
