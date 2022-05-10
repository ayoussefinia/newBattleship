const { ApolloServer } = require('apollo-server');
// const { Connections } = require("./Connections");
const { schema } = require('./schema')

const { randomUUID } = require('crypto');

  const typeDefs = schema;

  const resolvers = {
    Query: {
      ping: () => "Pong",
      startGame: async (parent, args, context, info) => { 
        return await queue(args.game.data, args.game);
      }
    },
    Mutation: {
      takeTurn: async (parent, args, context, info) => { 
        return await queue(args.game.opponentId, args.game);
      }
    }
  };



  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });




