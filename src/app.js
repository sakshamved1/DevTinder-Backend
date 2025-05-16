const express = require("express");
const connectDB = require("./config/database");
const app = express(); //Created server
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating new instance of user model
  const user = new User({
    firstName: "Anushka",
    lastName: "Sharma",
    email: "AnushkaSharma3@gmail.com",
    password: "Anushka@123",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Failed to add User");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully");

    app.listen(7777, () => {
      console.log("Server is Listening to Port 7777");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to Database");
  });
