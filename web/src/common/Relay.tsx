// import { gql, useSubscription } from "@apollo/client";

import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation, useQuery} from '@apollo/client';
import { AppContext } from "../AppContext";
import GameInput from "./GameInput";
import StartGame from "./api/StartGame";
import TakeTurn from "./api/TakeTurn";

// interface Game {
//   playerId: String;
//   opponentId: String;
//   data: any;
// }

// const QUEUE_PLAYER = gql`
//   subscription Subscription($game: String!) {
//     playerConnected(game: $game) {
//       playerId
//       opponentId
//       data
//     }
//   }
// `;

export default function Relay(props: any) {

  /*const TEST_MUTATION=gql`
    mutation {
      testMutation(payload: "hello")
    }
  `;*/

  const [startMatch, setStartMatch] = useState(false); // can only start the match once per session
  const [gameObj, setGameObj] = useState({} as GameInput);
  const [turn, setTurn] = useState(null);
  const [sendTurn, setSendTurn] = useState(false);
 
  useEffect(() => {

  }, [turn]);

  return (
    <div>
      {startMatch && <StartGame gameObj={gameObj}/>}
      
      {React.Children.map(props.children, child => (
        React.cloneElement(child, {
          exit: props.exit,
          start: setStartMatch,
          gameObject: setGameObj,
          turn: setTurn
        })
      ))}
    </div>
  );
}