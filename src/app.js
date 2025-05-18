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

// Get the User data by id
// app.get("/user", async (req, res) => {
//   const userId = req.body.id;

//   try {
//     const user = await User.findById(userId);

//     if (user.length === 0) {
//       res.status(404).send("User not Found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(404).send("Something Went Wrong");
//   }
// });

// Delete the User from database
app.delete("/user", async (req, res) => {
  const Userid = req.body.id;

  try {
    const user = await User.findByIdAndDelete(Userid);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("User not found");
  }
});

// Update the user using id
// app.patch("/user", async (req, res) => {
//   const userId = req.body.id;

//   const data = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "before",
//     });
//     res.send("User Updated succesfully");
//   } catch (err) {
//     res.status(400).send("Failed to update User");
//   }
// });


//Update the user using Email
app.patch("/user", async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);

  try {
    const query = { email: userEmail };

    const user = await User.findOneAndUpdate(query, { firstName: "Sonilal" }, {returnDocument : "before"});

    res.send("user updated successfullly using email");
  } catch (err) {
    res.status(400).send("Failed to add User");
  }
});

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
