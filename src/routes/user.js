const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

const { ConnectionRequestModel } = require("../models/connectionRequest");

const SAFE_USERDATA = "firstName lastName  photourl about skills";

const User = require("../models/user");
const { set } = require("mongoose");
const user = require("../models/user");

// Get all the request received by loggedInUser i.e. Interested
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_USERDATA);

    res.send({ data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Get all the connections of the User with Accepted status
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: userId, status: "accepted" }, //user1 => user2
        { toUserId: userId, status: "accepted" }, //user2 => user1
      ],
    })
      .populate("fromUserId", SAFE_USERDATA)
      .populate("toUserId", SAFE_USERDATA);

    const userData = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === userId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.send({ data: userData });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});



userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    //User should see All the user cards except
    // 1. his connections
    // 3. ignored Peoples
    // 0. his own card
    // 4. Already sent the connection request

    // Example ==> Rahul => [saksham, mark, dhoni, kevin]
    // R-->  saksham--> Rejected   R--> elon Accepted
    //

    const loggedInUser = req.user;

    const page  = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 2;
    limit = limit > 50 ? 50 : limit;

    const skip = (page -1 ) * limit;



    // ALL connection request [sent + received]
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId  toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    const hideUserFromFeed = new Set(); //unique

    // looped on all connectionReq to get Unique ignored Values
    connectionRequests.forEach((req) => {
      $and: [
        hideUserFromFeed.add(req.fromUserId),
        hideUserFromFeed.add(req.toUserId),
      ];
    }); // return All unique userids

    const Users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(SAFE_USERDATA).skip(skip).limit(limit);

    res.send({ data: Users });
  } catch (err) {
    res.send({ data: err.message });
  }
});


module.exports = userRouter;
