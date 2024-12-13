const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./app");
const connectWithRetry = require("./src/utils/dbRetry");

const PORT = process.env.PORT || 8080;

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
