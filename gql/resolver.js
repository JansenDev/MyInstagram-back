const userService = require("../Services/userService");
const followService = require("../Services/followService");

// Implementacion(resolvers) de las consultas de typeDefs
const resolvers = {
  //Tipo de consulta
  Query: {
    //Nombre de la funcion e implementacion
    getUser: (_, { id, username }) => userService.getUser(id, username),
    searchUsers: (_, { search }) => userService.searchUsers(search),
    isFollow: (_, { username }, ctx) => followService.isFollow(username, ctx),
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
  },
};

module.exports = resolvers;
