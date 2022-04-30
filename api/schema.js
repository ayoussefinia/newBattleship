const { gql } = require('apollo-server');

module.exports.schema = gql`
  type Query {
    testQuery(payload: String!): String
  }


  type Mutation {
    takeTurn(game: GameInput!): GameOutput
    startGame(game: GameInput!): String
    testMutation(payload: String!): String
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
