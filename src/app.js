const express = require("express");
const connectDB = require("./config/database");
const app = express(); //Created server
const User = require("./models/user");

app.use(express.json());


app.post("/signup", async (req, res) => {
  // console.log(req.body);
  
  // Creating new User from the data received from Signup APi
  const user = new User(req.body);

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
