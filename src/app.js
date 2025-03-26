const express = require("express");

const app = express(); //Created server

const { AdminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", AdminAuth);

app.post("/user/login", (req, res) => {
  console.log("user Logged in Successfully");
});

app.get("/user/profile", userAuth, (req, res) => {
  res.send("user Profile Details are: ");
});

app.get("/admin/GetUserInfo", (req, res) => {
  res.send("User info sent");
});

app.get("/admin/deleteuser", (req, res) => {
  res.send("Deleted a user from DB");
});

app.listen(7777, () => {
  console.log("Listening to Port 7777");
});
