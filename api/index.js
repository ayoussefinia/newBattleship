const { ApolloServer } = require('apollo-server');
const { Connections } = require("./Connections");
const { schema } = require('./schema')

const { randomUUID } = require('crypto');



  const typeDefs = schema;

  const resolvers = {
    Query: {
      // checkMatchStatus: game => Connections.checkMatchStatus(game),
      testQuery: (parent, {payload})=> {return payload+payload}
    },
    Mutation: {
      takeTurn: async (parent, args, context, info) => { 
       //   Connections.takeTurn(args);
          const response = new Promise((success, failure) => {
            setTimeout(() => 
            success({
              playerId: randomUUID(),
              opponentId: randomUUID(),
              data: JSON.stringify({ row: 1, col: 1})
            }), 5000);
          });
          return await response;
      },
      startGame: (parent, args, context, info) => { 
        return "You are waiting in line";
      },
      testMutation:(parent, {payload})=>{return payload }
    }
  };



  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });




