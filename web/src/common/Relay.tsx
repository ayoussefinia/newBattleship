import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { useEffect, useState } from "react";
import { randomUUID } from "crypto";

interface Game {
  playerId: String,
  opponentId: String,
  data: any | null | undefined
}

const START_GAME = (playerId: String, gameName: String) => gql`
 mutation Mutation {
  startGame(
    game: { playerId: ${playerId}, data: ${gameName} }
  )
}`;

const TAKE_TURN = (playerId: String, opponentId: String | null | undefined, data: any) => gql`mutation TakeTurn {
  takeTurn(game: { playerId: ${playerId}, data: ${JSON.stringify(data)}, opponentId: ${opponentId} }) {
    playerId
    opponentId
    data
  }
}`;

export default function Relay(props: any) {

  const child = React.Children.only(props.children);
  const playerId = randomUUID();
  let opponentId: String | null | undefined = null;
  let actualPage = <p>Connecting to other player...</p>;

  child.props.takeTurn = (turn: any) => {
    const [takeTurn, { data, loading, error }] = useMutation<Game>(
      TAKE_TURN(playerId, opponentId, turn),
      { variables: { playerId: playerId, opponentId: opponentId, data: turn } }
    );
    takeTurn();
    useEffect(() => { 
      child.props.turn = data?.data;
    }, [data]);
  };

  child.props.exit = props.exit;

  const [startGame, { data, loading, error }] = useMutation<Game>(
    START_GAME(playerId, props.name),
    { variables: { playerId: playerId, data: props.name } }
  );

  useEffect(() => {
    if(data) {
      if(data.opponentId) {
        opponentId = data.opponentId;
        actualPage = child;
      }
      child.props.turn = (data.data);
    }
  }, [data]);

  startGame();

  return actualPage;
}