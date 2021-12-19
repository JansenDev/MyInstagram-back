const userService = require("../Services/userService");
const followService = require("../Services/followService");
const postService = require("../Services/postService");
const commentService = require("../Services/commentService");
const likeService = require("../Services/likeService");

// Implementacion(resolvers) de las consultas de typeDefs
const resolvers = {
  //Tipo de consulta
  Query: {
    //Nombre de la funcion e implementacion
    getUser: (_, { id, username }) => userService.getUser(id, username),
    searchUsers: (_, { search }) => userService.searchUsers(search),
    // Follows
    isFollow: (_, { username }, ctx) => followService.isFollow(username, ctx),
    getFollowing: (_, { username }) => followService.getFollowing(username),
    getFollowers: (_, { username }) => followService.getFollowers(username),
    getNotFolloweds: (_, {}, ctx) => followService.getNotFolloweds(ctx),
    //Publication
    getPublication: (_, { username }) => postService.getPublications(username),
    // Comment
    getComments: (_, { idPost }) => commentService.getComments(idPost),
    // like
    isLiked: (_, { idPost }, ctx) => likeService.isLiked(idPost, ctx),
    countLikes: (_, { idPost }) => likeService.countLikes(idPost),
    getPostsFolloweds: (_, {}, ctx) => postService.getPostsFolloweds(ctx),
  },
  //Tipo de consulta
  Mutation: {
    //Nombre de la funcion e implementacion
    // User
    register: (_, { input }) => userService.register(input),
    login: (_, { input }) => userService.login(input),
    updateAvatar: (_, { file }, ctx) => userService.updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => userService.deleteAvatar(ctx),
    updateUser: (_, { input }, ctx) => userService.updateUser(input, ctx),
    // Follow
    follow: (_, { username }, ctx) => followService.follow(username, ctx),
    unFollow: (_, { username }, ctx) => followService.unFollow(username, ctx),
    // post
    post: (_, { file }, ctx) => postService.post(file, ctx),
    // comment
    addComment: (_, { input }, ctx) => commentService.addComment(input, ctx),
    // like
    like: (_, { idPost }, ctx) => likeService.like(idPost, ctx),
    deleteLike: (_, { idPost }, ctx) => likeService.deleteLike(idPost, ctx),
  },
};

module.exports = resolvers;
