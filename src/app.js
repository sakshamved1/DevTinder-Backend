const express = require("express");
const connectDB = require("./config/database");
const app = express(); //Created server
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter =  require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter  = require("./routes/user");

app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);






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
