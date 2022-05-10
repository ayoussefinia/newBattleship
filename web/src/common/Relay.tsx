import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useEffect, useState } from "react";

interface Game {
  playerId: String,
  opponentId: String,
  data: any | null | undefined
}

function StartGame(props: any) {

  const START_GAME = () => gql`
    query StartGame($playerId: String, $data: String) {
      startGame(game: { playerId: $playerId, data: $data }) {
        playerId
        opponentId
        data
      }
    }
  `;

  const { data, loading, error } = useQuery(
    START_GAME(),
    { variables: { playerId: props.playerId, data: JSON.stringify({ game: props.gameName }) } }
  );

  if (loading)
    return <p>Connecting to other player...</p>;

  let game = data?.startGame;
  console.log(game);


  return <TakeTurn gameName={props.gameName} playerId={props.playerId} isFirst={data?.data === props.gameName} opponentId={data?.opponentId} child={props.child} game={game}/>;
}

function TakeTurn(props: any) {

  const [turn, useTurn] = useState((props.game?.data === props.gameName) ? null: JSON.parse(props.game?.data));

  const [newChild, setChild] = useState(React.cloneElement(props.child, {
    ...props.child.props,
    exit: props.exit,
    playerId: props.playerId,
    opponentId: props.game?.opponentId,
    turn: turn,
    loading: false,
    takeTurn: setTurn
  }));

  const TAKE_TURN = () => gql`
  mutation TakeTurn($playerId: String, $data: String, $opponentId: String) {
    takeTurn(game: { playerId: $playerId, data: $data, opponentId: $opponentId }) {
      playerId
      opponentId
      data
    }
  }`;
 let serialized = null;
  const [takeTurn, { data, loading, error }] = useMutation<Game>(
    TAKE_TURN(),
    { variables: { playerId: props.playerId, opponentId: props.opponentId, data: serialized } }
  );

function Turner(props: any) {
  useTurn(JSON.parse(props.turn));
  return newChild;
}

  function setTurn(tturn: any) {
    serialized = JSON.stringify(tturn);
    takeTurn({ variables: { playerId: props.playerId, opponentId: props.opponentId, data: serialized } });
  }
  if(loading)
    return newChild;
  else
    return <Turner turn={data?.data}/>;
}

export default function Relay(props: any) {

  const exitGame = props.exit;
  const gameName = props.name;
  const playerId = props.playerId;

  return <StartGame gameName={gameName} playerId={playerId} child={props.page} exit={exitGame} />;
}