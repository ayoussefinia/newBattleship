const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema')
const { queue, shutdown } = require('./Queue');


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



  const server = new ApolloServer({ typeDefs, resolvers, 
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              shutdown();
            }
          }
        }
      }
    ],
    formatError: (err) => {
    
      return err;
    } 
  });
  
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });




