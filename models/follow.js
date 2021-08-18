const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = Schema({
  idUser: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  follow: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Follow",FollowSchema);