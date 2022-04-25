const { gql } = require('apollo-server');

module.exports.schema = gql`
  type Query {
    checkMatchStatus(game: GameInput!): String  
  }

  type Mutation {
    takeTurn(game: GameInput!): GameOutput
    startGame(game: GameInput!): String
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
