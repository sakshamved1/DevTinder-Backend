
const express = require('express');

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const User = require("../models/user");
const { validateEditProfileData } = require('../utils/validation');
const user = require('../models/user');
const bcrypt = require('bcrypt')



profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

  try {
    if (!validateEditProfileData) {
      res.send("Update not Allowed in Profile")
    }




    const loggedInUser = req.user;

    Object.keys(req.body).forEach(keys => loggedInUser[keys] = req.body[keys]);


    await loggedInUser.save();


    res.json({message : `${loggedInUser.firstName}, Your Profile is Updated Successfully`, data : loggedInUser});


  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})


profileRouter.patch("/profile/password", userAuth, async  (req,res) => {

  try {
    const user = req.user;

    const {curr_password, new_password} = req.body;

    const isPasswordValid = await bcrypt.compare(curr_password, user.password);


    if (!isPasswordValid) {
      return res.status(400).send("Your Current password is not Valid");
    }


    const hashedPass = await bcrypt.hash(new_password, 2);

    user.password = hashedPass;

    await user.save();

    res.send("User Password updated successfully");


  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
})



module.exports = profileRouter;