require("dotenv").config();
const app = require("./app");
const connectWithRetry = require("./src/utils/dbRetry");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB with retry mechanism
connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});