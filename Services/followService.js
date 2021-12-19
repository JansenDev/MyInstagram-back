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
    else return false;
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

async function getFollowing(username) {
  const userFound = await User.findOne({ username });

  if (!userFound) throw new Error("User not found");

  const idUser = userFound._id;
  const followers = await Follow.find({ idUser: idUser }).populate("follow");

  folloersList = [];
  for await (const follower of followers) {
    folloersList.push(follower.follow);
  }
  return folloersList;
}

async function getFollowers(username) {
  const userfound = await User.findOne({ username });

  if (!userfound) throw new Error("User not found");

  const idUser = userfound._id;
  const followers = await Follow.find({ follow: idUser }).populate("idUser");

  followersList = [];
  for await (const follower of followers) {
    followersList.push(follower.idUser);
  }
  return followersList;
}

async function getNotFolloweds(ctx) {
  const idUser = ctx.user.id;

  const usersList = await User.find().limit(50);

  usersNotFollowedsList = [];
  for await (const user of usersList) {
    const followed = await Follow.findOne({ idUser })
      .where("follow")
      .equals(user._id);
    if (!followed) {
      if (idUser.toString() !== user._id.toString()) {
        usersNotFollowedsList.push(user);
      }
    }
  }

  return usersNotFollowedsList;
}
module.exports = {
  follow,
  isFollow,
  unFollow,
  getFollowing,
  getFollowers,
  getNotFolloweds,
};
