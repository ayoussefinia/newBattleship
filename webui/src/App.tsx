import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import client from './GraphQL';
import { gql, useMutation } from '@apollo/client';

const QUEUE_PLAYER = gql`
mutation Mutation($game: String!) {
  queuePlayer(game: $game)
}    
`;

function App() {
  const [startGame, { data, loading, error }] = useMutation(QUEUE_PLAYER);

  startGame({
    variables: { game: "TicTacToe" },
  }).then(value => console.log(value));

  
  if (error) return `Error! ${error}`;

  return (
    <div>
      <p>{"Hello"}</p>
    </div>
  );
}

export default App;
