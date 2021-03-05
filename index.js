const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server')
const  typeDefs  = require('./gql/schema');
const  resolvers = require('./gql/resolver');

require('dotenv').config({path:".env" });

console.log(process.env.BBDD);
mongoose.connect(
    process.env.BBDD,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true,
        useCreateIndex:true,
    },
    (err, _)=>{
        if(err){
            console.log("No Connected.");
        }else{
            //Ejecutar Server GraphQL
            server();
        }
    }
    );
    //Server e integracion de los typeDefs-resolvers GraphQL
    function server(){
        const serverApollo = new ApolloServer({
            typeDefs:typeDefs,
            resolvers:resolvers
        });

        serverApollo.listen().then(({ url })=>{
            console.log(`Apollo server on ${ url }`);
        });
        
    };
