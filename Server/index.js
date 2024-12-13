const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./app");
const connectWithRetry = require("./src/utils/dbRetry");

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectWithRetry();
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();