const Comment = require("../models/comment");

async function addComment(input, ctx) {
  const { idPost, comment } = input;
  const idUser = ctx.user.id;

  try {
    const result = new Comment({
      idPost,
      idUser,
      comment,
    });

    await result.save();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getComments(idPost) {
  try {
    const result = await Comment.find({ idPost }).populate("idUser");
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addComment,
  getComments,
};
