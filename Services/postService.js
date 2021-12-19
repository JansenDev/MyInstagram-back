const Post = require("../models/post");
const User = require("../models/user");
const Follow = require("../models/follow");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");

async function post(file, ctx) {
  const { id } = ctx.user;
  const { mimetype, createReadStream } = await file;

  const fileExtension = mimetype.split("/")[1];

  const postName = `post/${0}${uuidv4()}.${fileExtension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, postName);

    const post = new Post({
      idUser: id,
      file: result,
      typeFile: mimetype.split("/")[0],
      createAt: Date.now(),
    });

    post.save();

    if (result) {
      return {
        status: true,
        urlFile: result,
      };
    } else {
      return {
        status: false,
        urlFile: null,
      };
    }
  } catch (error) {}
}

async function getPublications(username) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const publications = await Post.find()
    .where({ idUser: user._id })
    .sort({ createAt: -1 });

  if (publications) return publications;
}

async function getPostsFolloweds(ctx) {
  const FollowedsOfUserList = await Follow.find({
    idUser: ctx.user.id,
  }).populate("follow");

  const followsList = [];
  for await (const followed of FollowedsOfUserList) {
    followsList.push(followed.follow);
  }
  const postsFeed = [];
  for await (const followed of followsList) {
    const postsList = await Post.find()
      .where({ idUser: followed._id })
      .sort({ createAt: -1 })
      .populate("idUser");
    postsFeed.push(...postsList);
  }
  const postFeedOutput = postsFeed.sort((a, b) => {
    return new Date(b.createAt) - new Date(a.createAt);
  });

  // console.log(postsFeed);

  return postFeedOutput;
}
module.exports = {
  post,
  getPublications,
  getPostsFolloweds,
};
