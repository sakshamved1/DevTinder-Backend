const express = require("express");

const app = express(); //Created server



app.get("/user/:userId" , (req, res) => {
    console.log(req.params);
    
    
  res.send({ Fname: "James", Lname: "Bond", City: "Jaipur" });
});


//regex
// app.get(/.*fly$/ , (req, res) => {
//   res.send({ Fname: "James", Lname: "Bond", City: "Jaipur" });
// });





app.use("/test", (req, res) => {
    res.send("Hello from test server!!");
  });
  

app.listen(7777, () => {
  console.log("Server is successfully listening to port 7777");
});
