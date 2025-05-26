const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email id Is not Valid :   " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a Strong Password");
        }
      },
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Please enter Valid Photo URL");
          
        }
      }
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
