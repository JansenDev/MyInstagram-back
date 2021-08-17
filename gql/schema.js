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
    webSite: String
  }

  #//* METODOS
  # GET
  type Query {
    #User
    getUser(id: ID, username: String): User
  }
  # POST, PUT, DELETE
  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
    deleteAvatar: Boolean
    updateUser(input: UserUpdateInput): Boolean
  }
`;

module.exports = typeDefs;
