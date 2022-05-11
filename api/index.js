const { ApolloServer } = require('apollo-server');
// const { Connections } = require("./Connections");
const { schema } = require('./schema')
const { typeDefs } = require('./schema')
const { queue } = require('./Queue');


  const resolvers = {
    Query: {
      ping: () => "Pong",
      startGame: async (parent, args, context, info) => { 
        const input = JSON.parse(args.game.data);
        return await queue.playerConnected(input.game, args.game);
      }
    },
    Mutation: {
      takeTurn: async (parent, args, context, info) => { 
        console.log("Taking turn: " + JSON.stringify(args.game));
        return await queue.takeTurn(args.game.opponentId, args.game);
      }
    }
  };



  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });




