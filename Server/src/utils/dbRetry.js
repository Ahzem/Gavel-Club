const connectDB = require('../config/db');

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

async function connectWithRetry(retries = MAX_RETRIES) {
  try {
    await connectDB();
  } catch (error) {
    console.error(`Failed to connect to MongoDB. Retries left: ${retries}`);
    if (retries > 0) {
      console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
      setTimeout(() => {
        connectWithRetry(retries - 1);
      }, RETRY_DELAY);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  }
}

module.exports = connectWithRetry;