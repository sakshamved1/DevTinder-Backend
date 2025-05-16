const mongoose = require("mongoose");

// Created new schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  id: {
    type: String,
  },
});

// created User model
module.exports = mongoose.model("User", userSchema);
