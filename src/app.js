const express = require("express");

const app = express(); //Created server

app.use(
  "/user",
  (req, res, next) => {
    //Route handler
    console.log("1st Response");
    // res.send("Route handler 1");
    next();
  },
  (req, res, next) => {
    //Route handler
    console.log("2nd Response");
    // res.send("Route handler 2");
    next();
  },
  (req, res) => {
    //Route handler
    console.log("3rd Response");
    res.send("Route handler 3");
  },
  (req, res) => {
    //Route handler
    console.log("4th Response");
    res.send("Route handler 4");
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening to port 7777");
});
