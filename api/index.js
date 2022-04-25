const { ApolloServer, gql } = require('apollo-server');
const { Connections } = require("./Connections.js");

const fs = require('fs');

fs.readFile('./schema.graphql', 'utf8', (err, data) => {
  if (err) throw err;
  // Construct a schema, using GraphQL schema language
  // WebSockets for players so we know if/when they drop
  const typeDefs = gql(data);
  const resolvers = {
    Query: {
      ping: () => "pong"
    },
    Mutation: {
      takeTurn: (parent, args, context, info) => { 
          Connections.incomingMessage(args);
                  /* {
                    playerId: 'asdfasdf',
                    opponentId: 'fasfsfa',
                    data: ? { }
                  }*/
          return "Ok!";
      }
    },
    Subscription: {
      playerConnected: (parent, args, context, info) => {
        subscribe: Connections.playerConnected(args);
        /* {
          playerId: 'asdfasdf'
        }*/
      }
    }
  };



  const server = new ApolloServer({ typeDefs, resolvers, 
  subscriptions: {
    onConnect: (connectionParams, webSocket) => { 
      return true;
    }
  }
});
  
  // The `listen` method launches a web server.
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(` Server ready at ${url} and ${subscriptionsUrl}`);
  });
});




