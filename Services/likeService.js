const Like = require("../models/like");

async function like(idPost, ctx) {
  try {

    const newLike = new Like({
      idPost,
      idUser: ctx.user.id,
    });

    const response = await newLike.save();

    if (!response) return false;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteLike(idPost, ctx) {
  try {
    const idUser = ctx.user.id;

    const response = await Like.findOneAndDelete({ idPost }).where({
      idUser,
    });
    if (!response) return false;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function isLiked(idPost, ctx) {
  try {
    const idUser = ctx.user.id;
    const idPostFound = await Like.findOne({ idPost }).where({ idUser });

    if (idPostFound) return true
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function countLikes(idPost) {
  try {
    const likesTotal = await Like.countDocuments({ idPost });
    return likesTotal;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  like,
  deleteLike,
  isLiked,
  countLikes,
};
