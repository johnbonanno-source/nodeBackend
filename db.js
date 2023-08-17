const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://Budgethero:eatbutt@cluster0.55ykuqg.mongodb.net/Users?retryWrites=true&w=majority", {
      useNewUrlParser: true, // Add this option
      useUnifiedTopology: true, // Add this option to use the new server discovery and monitoring engine
    });
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = {
  mongoose,
  connectDatabase,
};
