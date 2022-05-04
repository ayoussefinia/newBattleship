const { ApolloServer } = require('apollo-server');
const gql = require('graphql');
const { typeDefs } = require('./schema');
const { queue } = require('./Queue');

const resolvers = {
    Query: {
      ping: () => "Pong"
    },
    Mutation: {
      takeTurn: async (parent, args, context, info) => { 
        return await queue(args.game.opponentId, args.game);
      },
      startGame: async (parent, args, context, info) => { 
        return await queue(args.game.data, args.game);
      }
    }
  };
  
  new ApolloServer({ typeDefs, resolvers }).listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });




