const { gql } = require('apollo-server')

const typeDefs = gql`
    #//* MODELOS
    # Modelo de salida de la consulta
    type User{
        id: ID,
        name:String,
        username:String,
        email:String,
        siteweb:String,
        description:String,
        password:String,
        avatar:String,
        createAt:String
    }

    type Token{
        token: String
    }

    #//* Modelo de entrada(input) para consulta
    input UserInput{
        name: String!
        username:String!
        email:String!
        password:String!
    }

    input LoginInput{
        email: String!
        password: String!
    }


    #//* METODOS
    # GET
    type Query {
        #User
        getUser(id:ID, username:String):User
    }
    # POST, PUT, DELETE
    type Mutation{
        #User
        register(input: UserInput ):User
        login(input: LoginInput):Token
    }
`;

module.exports = typeDefs;