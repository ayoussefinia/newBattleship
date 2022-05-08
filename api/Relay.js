const { ApolloServer } = require('apollo-server');
const { Connections } = require("./Connections");
const { schema } = require('./schema')

const { randomUUID } = require('crypto');

const waiting = {};

const typeDefs = gql`
  type Query {

  }

  type Mutation {
    takeTurn(payload: GameInput!): GameOutput
    startGame(payload: GameInput!): GameOutput
  }

  type GameOutput {
    playerId: String
    opponentId: String
    data: String
  }

  input GameInput {
    playerId: String
    opponentId: String
    data: String
  }
`;
function matchMade(){

}
function addToWaiting(){

}

async function playerConnected(gameName){
    if(waiting[gameName]){
        return matchMade(gameName)
    }
    else {
        return addToWaiting(gameName)
    }
}

const resolvers = {
    Query: {

    },
    Mutation: {
        //
        startGame: (parent, args, context, info)=>{
            return await playerConnected(args.data, args.playerId)
        },
        takeTurn: ()=>{}
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
  
server.listen().then(({ url }) => {
  console.log(` Server ready at ${url}`);
});


// if(!waiting[args.data]) { // check if there are no players waiting to play this game
//     let timer = new Promise((resolve, reject) => {
//       waiting[args.data] = resolve
//     });
//     return await timer;
//   }else{ // waiting player found
//     return waiting[args.data].resolve()
//   }