const userService = require('../Services/userService');

// Implementacion(resolvers) de las consultas de typeDefs
const resolvers = {

    //Tipo de consulta
    Query:{
        //Nombre de la funcion e implementacion
        getUser: (_, { id, username })=>userService.getUser(id, username) ,
    },
    //Tipo de consulta
    Mutation:{
        //Nombre de la funcion e implementacion
        register: (_ , { input }) => userService.register(input),
        login:(_, { input }) => userService.login(input),
 
    }
};

module.exports = resolvers ;