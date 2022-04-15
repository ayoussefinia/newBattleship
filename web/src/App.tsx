import React, { Component, ReactElement, useState } from 'react';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Grid, Paper } from '@mui/material';
import Board from './TicTacToe/board'
import './common/assets/css/menu.css';
import TicTacToe from './TicTacToe/TicTacToe';
import Battleship from './Battleship/Battleship'
import Home from './Home';


function App() {

const [page, setPage] = useState(null);
const exit = () => setPage(null);

/// ===========================================  Add Games Here
const pages = [ 
  TicTacToe,
  Battleship
];
// =========================================================

const home = <Home pages={pages} setPage={setPage} />;

  //
   //const { data, loading, error } = useQuery(GET_STATUS);

   //if (loading) return <p>'Submitting...'</p>;
   //if (error) return <p>`Submission error! ${error.message}`</p>;

  return page || home;
}

export default App;
