import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useEffect, useState } from "react";

interface Game {
  playerId: String,
  opponentId: String,
  data: any | null | undefined
}

function StartGame(props: any) {

  const START_GAME = () => gql`
    mutation StartGame($playerId: String, $data: String) {
      startGame(game: { playerId: $playerId, data: $data }) {
        playerId
        opponentId
        data
      }
    }
  `;

  const [startGame, { data, loading, error }] = useMutation<Game>(
    START_GAME(),
    { variables: { playerId: props.playerId, data: props.gameName } }
  );

  useEffect(() => { startGame() }, [props.child, startGame]);

  if (loading)
    return <p>Connecting to other player...</p>;

    props.child.props = { ... props.child.props, props: props.exit, turn: undefined, loading: false };

  return <TakeTurn gameName={props.gameName} playerId={props.playerId} opponentId={data?.opponentId} exit={props.exit} child={props.child}/>;
}

function TakeTurn(props: any) {

  const TAKE_TURN = () => gql`
  mutation TakeTurn($playerId: String, $data: String, $opponentId: String) {
    takeTurn(game: { playerId: $playerId, data: $data, opponentId: $opponentId }) {
      playerId
      opponentId
      data
    }
  }`;

let serialized = JSON.stringify(props.child.props.turn);
const [takeTurn, { data, loading, error }] = useMutation<Game>(
    TAKE_TURN(),
    { variables: { playerId: props.playerId, opponentId: props.opponentId, data: serialized } }
  );
  
  props.child.props.loading = loading;
  props.child.props.turn = data;
  
  return props.child;
}

export default function Relay(props: any) {

  const exitGame = props.exit;
  const gameName = props.name;
  const child = props.page;
  const playerId = props.playerId;

  return <StartGame gameName={gameName} playerId={playerId} exit={exitGame} child={child} />;
}