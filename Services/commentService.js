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

    const data = await result.save();
    console.log(data);
    return result;
  } catch (error) {
    console.log(error);
  }

  console.log("comentado");
  console.log(input);
  console.log(ctx);
}

async function getComments(idPost) {
  try {
    const result = await Comment.find({ idPost })
      .populate("idUser");
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addComment,
  getComments,
};
