const Follow = require("../models/follow");
const User = require("../models/user");

async function follow(username, ctx) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("User not found");
  //   console.log(userFound);
  try {
    const newFollow = new Follow({
      idUser: ctx.user.id,
      follow: userFound._id,
    });
    newFollow.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function isFollow(username, ctx) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("User not found");
  try {
    const follow = await Follow.find({ idUser: ctx.user.id })
      .where("follow")
      .equals(userFound._id);
    if (follow.length > 0) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function unFollow(username, ctx) {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("User not found");
  try {
    const follow = await Follow.deleteOne({ idUser: ctx.user.id })
      .where("follow")
      .equals(userFound._id);

    if (follow.n > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  follow,
  isFollow,
  unFollow,
};
