const { ApolloServer, gql } = require('apollo-server');
const { WaitingRoom }  = require('./WaitingRoom.js');
const { Connections } = require("./Connections.js");
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
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
  const server = new ApolloServer({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: server,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });
});




