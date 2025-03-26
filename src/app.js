const express = require("express");

const app = express(); //Created server

app.get("/getuserdata", (req, res, next) => {
  try {
    throw new Error("kdjhbgshj");
    //Logic of DB call and fecthing data
    res.send("user info has been sent");
  } catch (error) {
    res.status(401).send("Some error Occured");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(401).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Listening to Port 7777");
});
