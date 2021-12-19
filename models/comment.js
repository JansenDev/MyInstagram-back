const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Post",
  },

  idUser: {
    type: Schema.Types.ObjectId,
    trim: true,
    require: true,
    ref: "User",
  },

  comment: {
    type: String,
    trim: true,
    require: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
