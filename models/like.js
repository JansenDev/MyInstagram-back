const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Post",
  },
  idUser: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Like", LikeSchema);
