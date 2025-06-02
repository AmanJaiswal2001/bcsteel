const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connection successful");
  } catch (error){
    console.log("Connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
