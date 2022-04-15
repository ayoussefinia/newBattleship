import React, { Component, ReactElement, useState } from 'react';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Grid, Paper } from '@mui/material';
import Board from './TicTacToe/board'
import TicTacToe from './TicTacToe/TicTacToe';
import Home from './Home';


function App() {

const [page, setPage] = useState(null);
const exit = () => setPage(null);

/// ===========================================  Add Games Here
const pages = [ 
  new (TicTacToe as any)(exit),

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
