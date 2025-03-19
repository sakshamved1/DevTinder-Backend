const express = require("express");

const app = express(); //Created server



// app.use((req, res) => {
//     res.send("Hello from Server")
// })

app.use("/test",(req, res) => {
    res.send("Hello from Test server")
})

app.use("/hello",(req, res) => {
    res.send("Hello  server")
})


app.use("/dashboard",(req, res) => {
    res.send("Hello from dashboard")
})







app.listen(7777, () => {
    console.log("Server is successfully listening to port 7777");
    
});




