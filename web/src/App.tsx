import React, { Component, ReactElement, useState } from 'react';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Grid, Paper } from '@mui/material';
import Board from './TicTacToe/board'
import './common/assets/css/menu.css';
import TicTacToe from './TicTacToe/TicTacToe';
import ConnectFour from './ConnectFour/ConnectFour';
import Battleship from './Battleship/Battleship'

import Home from './Home';
import RockPaperScissor from './RockPaperScissor/RockPaperScissor'


function App() {

const [page, setPage] = useState(null);
const exit = () => setPage(null);

/// ===========================================  Add Games Here
const pages = [ 
  TicTacToe,
  Battleship,
  RockPaperScissor,
  ConnectFour
];
// =========================================================

const home = <Home pages={pages} setPage={setPage} />;

  return page || home;
}

export default App;
