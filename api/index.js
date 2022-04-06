const { ApolloServer, gql } = require('apollo-server');
const { WaitingRoom }  = require('./WaitingRoom.js');
const fs = require('fs');

fs.readFile('./schema.graphql', 'utf8', (err, data) => {
  if (err) throw err;
  // Construct a schema, using GraphQL schema language
  // WebSockets for players so we know if/when they drop
  const typeDefs = gql(data);
  const resolvers = {
    Query: {
      getStatus: (parent, args, context, info) => {
        return WaitingRoom.getStatus();
      }
    },
    Mutation: {
      queuePlayer: (parent, args, context, info) => {
        return WaitingRoom.queuePlayer(args.game);
      }
    }
  };
  const server = new ApolloServer({ typeDefs, resolvers });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });
});




