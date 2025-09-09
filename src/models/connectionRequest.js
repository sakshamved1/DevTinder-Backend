const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "User" //Reference to user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : "User" //Reference to user collection

    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is not a Valid Status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function ( next) {
  const connectionRequest = this;

  if (connectionRequest.toUserId.equals(connectionRequest.fromUserId)) {
    throw new Error("Can't send connection Request to yourself");
  }

  next();
})





const ConnectionRequestModel = mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema
);

module.exports = { ConnectionRequestModel };
