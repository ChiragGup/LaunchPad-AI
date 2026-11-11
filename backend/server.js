import "dotenv/config";

import app from "./app.js";
import dataBaseConnection from "./config/db.js";

dataBaseConnection()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});