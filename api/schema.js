const { gql } = require('apollo-server');

const typeDefs =  gql`
  type Query { 
    ping: String
  }

  type Mutation {
    takeTurn(game: GameInput!): GameOutput
    startGame(game: GameInput!): GameOutput
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
  }`;

module.exports.typeDefs = typeDefs;