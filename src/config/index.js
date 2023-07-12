const mongoose = require("mongoose");

const database_connection = async () => {
  try {
    mongoose
      .connect("", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = { database_connection };
