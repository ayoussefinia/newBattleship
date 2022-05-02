// import { gql, useSubscription } from "@apollo/client";

import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation, useQuery} from '@apollo/client';
import { AppContext } from "../AppContext";
import GameInput from "./GameInput";
import StartGame from "./api/StartGame";

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

  const [startMatch, setStartMatch] = useState(false);
  const [gameObj, setGameObj] = useState({} as GameInput);

  return (
    <div>
      {startMatch && <StartGame gameObj={gameObj}/>}
      {React.Children.map(props.children, child => (
        React.cloneElement(child, {
          exit: props.exit,
          start: setStartMatch,
          gameObject: setGameObj
        })
      ))}
    </div>
  );
}