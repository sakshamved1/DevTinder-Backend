const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

const mongoose = require("mongoose");

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

      // console.log(existingConnectionRequest);

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

      // console.log(connectionRequest);

      const data = await connectionRequest.save();

      // res.json(fromUserId.firstName )

      res.status(201).json({
        message: `${fromUserId} is ${status} in ${toUserId}`,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);



requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const ALLOWED_STATUS = ["accepted", "rejected"];

      //checked status
      if (!ALLOWED_STATUS.includes(status)) {
        return res.json({ message: "Status not Allowed" });
      }

      //check requestid
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.json({ message: "connection request not found" });
      }

      //change status and save
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "connection request is : " + status, data });

      // saksham > elon

      // Data validation
      // check requestId exist om DB
      // status == "interested"
      // loggedInUser = toUserId
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
