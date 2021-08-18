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
    siteweb: String
    description:String
  }
# CAMBIAR SALIDA DE UPDATEUSER PARA ACTUALIZAR LA CACHE
# Convertir el typo test a una interfaz para extender(etc) para las buenas practicas
type Test{
    # oldPassword: String
    # newPassword: String
    email: String
    siteweb: String
    description:String
  }

  type UpdateUserOutput{
    status:Boolean
    email: String
    siteweb: String
    description:String
  }

  #//* METODOS
  # GET
  type Query {
    #User
    getUser(id: ID, username: String): User
    searchUsers(search:String):[User]
    isFollow(username:String!):Boolean
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
    follow(username:String!):Boolean
    unFollow(username:String!):Boolean
  }
`;

module.exports = typeDefs;
