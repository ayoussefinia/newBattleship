const { gql } = require('apollo-server');

module.exports.schema = gql`
  type Query {
    testQuery(payload: String!): String
    getGameData(payload: String!): String
  }


  type Mutation {
    takeTurn(payload: String!): String
    startGame(payload:String!):String
    testMutation(payload: String!): String
    turnResult(payload: String!): String
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



  // """startGame(game: GameInput!): String"""
  // takeTurn(game: GameInput!): GameOutpu
  