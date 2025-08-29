const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user")


requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      //checking if status is valid
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Your Status is not Valid");
      }

      //check Before sending connection Req if toUserId exist in Database or nope
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found in DB !!" });
      }

      //check if there's existing connection request
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      console.log(existingConnectionRequest);

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Already exist" });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      console.log(connectionRequest);

      const data = await connectionRequest.save();

      res.send("Connection Request Sent successfully");
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);



module.exports = requestRouter;
