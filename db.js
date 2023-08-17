const mongoose = require("mongoose");

mongoose
  .connect("your-database-url")
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

module.exports = mongoose;