import React, { Component, ReactElement, useState } from 'react';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Grid, Paper } from '@mui/material';
import Board from './TicTacToe/board'
import './common/assets/css/menu.css';
import TicTacToe from './TicTacToe/TicTacToe';
import Battleship from './Battleship/Battleship'
import Home from './Home';

const QUEUE_PLAYER = gql`
  mutation Mutation($game: String!) {
    queuePlayer(game: $game)
  }    
  `;

const GET_STATUS = gql`
  query ExampleQuery {
    getStatus {
      game
    }
  }
  `;

function App() {

const [page, setPage] = useState(null);
const exit = () => setPage(null);
const pages = [ 
  TicTacToe,
  Battleship
];

const home = <Home pages={pages} setPage={setPage} />;

  //const [startGame, { data, loading, error }] = useMutation(QUEUE_PLAYER);
   //const { data, loading, error } = useQuery(GET_STATUS);

   //if (loading) return <p>'Submitting...'</p>;
   //if (error) return <p>`Submission error! ${error.message}`</p>;

  return page||home;
}

export default App;
