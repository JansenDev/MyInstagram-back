const { gql } = require("apollo-server");

const typeDefs = gql`
  #//* MODELOS
  # Modelo de salida de la consulta
  type User {
    id: ID
    name: String
    username: String
    email: String
    siteweb: String
    description: String
    password: String
    avatar: String
    createAt: String
  }

  type Token {
    token: String
  }

  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }

  type post {
    status: Boolean
    urlFile: String
  }

  type Publication {
    id: ID
    idUser: ID
    file: String
    typefile: String
    createAt: String
  }

  type Comment {
    idPost: ID
    idUser: User
    comment: String
    createAt: String
  }

  type FeedPost{
    id:ID
    idUser:User
    file:String
    typefile: String
    createAt: String
  }

  #//* Modelo de entrada(input) para consulta
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserUpdateInput {
    oldPassword: String
    newPassword: String
    # repeatPassword: String
    email: String
    siteweb: String
    description: String
  }

  input CommentInput {
    idPost: ID
    comment: String
  }

  # Borrar
  input LikeInput {
    idPost: ID
    idUser: ID
  }
  #

  # CAMBIAR SALIDA DE UPDATEUSER PARA ACTUALIZAR LA CACHE
  # Convertir el typo test a una interfaz para extender(etc) para las buenas practicas
  type Test {
    # oldPassword: String
    # newPassword: String
    email: String
    siteweb: String
    description: String
  }

  type UpdateUserOutput {
    status: Boolean
    email: String
    siteweb: String
    description: String
  }
  # type Follower{
  #   id:ID
  #   follow:String
  #   idUser:String
  #   createAt:String
  # }

  #//* METODOS
  # GET
  type Query {
    #User
    getUser(id: ID, username: String): User
    searchUsers(search: String): [User]
    # Follow
    isFollow(username: String!): Boolean
    getFollowing(username: String!): [User]
    getFollowers(username: String!): [User]
    getNotFolloweds:[User]

    # post
    getPublication(username: String!): [Publication]
    # comments
    getComments(idPost: ID!): [Comment]
    # like
    isLiked(idPost:ID):Boolean
    countLikes(idPost:ID):Int
    getPostsFolloweds:[FeedPost]

  }
  # POST, PUT, DELETE
  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UserUpdateInput): UpdateUserOutput

    #Follow
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean

    #post
    post(file: Upload): post
    #comment
    addComment(input: CommentInput): Comment
    # like
    like(idPost: ID): Boolean
    deleteLike(idPost:ID):Boolean
  }
`;

module.exports = typeDefs;
