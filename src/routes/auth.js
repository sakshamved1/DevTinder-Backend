const express = require("express");

const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation");

const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    //encrypting pasword into hash
    const passwordHash = await bcrypt.hash(password, 10);

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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;


