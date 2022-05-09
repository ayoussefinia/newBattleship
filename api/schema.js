const { gql } = require('apollo-server');

const typeDefs =  gql`
  type Query { 
    ping: String
    startGame(game: GameInput!): GameOutput
  }

  type Mutation {
    takeTurn(game: GameInput!): GameOutput
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
