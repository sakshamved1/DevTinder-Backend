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

// Get the User data by Email
app.get("/user", async (req, res) => {
  // console.log(req.body.email);
  const UserEmail = req.body.email;

  try {
    const user = await User.find({ email: UserEmail });

    if (user.length === 0) {
      res.status(404).send("User not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something Went Wrong");
  }
});


// // Get the User data by id
// app.get("/user", async (req, res) => {

//   const userId = req.body.id;

//   try {
//     const user = await User.findById({ _id: userId });

//     if (user.length === 0) {
//       res.status(404).send("User not Found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(404).send("Something Went Wrong");
//   }
// });



// Feed API - GET /feed - Get all the users from Database
app.get("/feed", async (req, res) => {
  console.log(req.body.email);

  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(404).send("Something Went Wrong");
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
