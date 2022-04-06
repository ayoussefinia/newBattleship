import React from 'react';
import logo from './logo.svg';
import './App.css';
import { gql, useMutation, useQuery } from '@apollo/client';

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

  //const [startGame, { data, loading, error }] = useMutation(QUEUE_PLAYER);
   const { data, loading, error } = useQuery(GET_STATUS);

   if (loading) return <p>'Submitting...'</p>;
   if (error) return <p>`Submission error! ${error.message}`</p>;

  return (
    <div>
     {data.getStatus.map((obj: {game: String}) => <p>{obj.game} </p>)}
    </div>
  );
}

export default App;
