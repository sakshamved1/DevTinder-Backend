const express = require("express");
const connectDB = require("./config/database");
const app = express(); //Created server
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    //encrypting pasword into hash
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

    // Creating new User from the data received from Signup APi
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Failed to add User : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Crete JWT token
      const token = await user.getJWT();

      console.log(token);

      // Add the token to cookie and send back to the user
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

      res.send("Logged in successfully");
    } else {
      throw new Error("Invalid creds");
    }
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //Sending Connection req
  console.log("Sending connection request");

  res.send(user.firstName + " sent the Connection req");
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
