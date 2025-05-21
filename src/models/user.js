const mongoose = require("mongoose");

// Created new schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
          
        }
      }
    },
    photourl: {
      type: String,
      default : "https://www.360legal.in/wp-content/uploads/2021/01/nobody.jpg"
    },
    about: {
      type: String,
      default: "This is default About of User"
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// created User model
module.exports = mongoose.model("User", userSchema);
