const mongoose = require("mongoose");

// Using mongoose it connect us to mongoDB
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gardneresbillyer:gardneresbillyers@nnode.50njf.mongodb.net/devTinder"
  );
};


module.exports = connectDB;