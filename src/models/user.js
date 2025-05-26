const mongoose = require("mongoose");

// Created new schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
    photourl: {
      type: String,
      default: "https://www.360legal.in/wp-content/uploads/2021/01/nobody.jpg",
    },
    about: {
      type: String,
      default: "This is default About of User",
    },
    skills: {
      type: [String],
      validate: function (arr) {
        return arr.length <= 4;
      },
      message: "You can enter max 4 SKills",
    },
  },
  {
    timestamps: true,
  }
);

// created User model
module.exports = mongoose.model("User", userSchema);
