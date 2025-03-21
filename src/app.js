const express = require("express");

const app = express(); //Created server

app.use("/user", (req, res) => {
  res.send("HAHAHAHAAHAHHAHA!!");
});

app.get("/user", (req, res) => {
  res.send({ Fname: "James", Lname: "Bond", City: "Jaipur" });
  console.log("SUCCESSFULLY GET THE USER DATA");
});

app.post("/user", (req, res) => {
  //Saving to DB
  res.send("SUCCESSFULLY UPDATED THE DATA USING POST REQUEST");
});

app.delete("/user", (req, res) => {
  res.send("Deleted  Successfully");
});


app.use("/test", (req, res) => {
    res.send("Hello from test server!!");
  });
  

app.listen(7777, () => {
  console.log("Server is successfully listening to port 7777");
});
