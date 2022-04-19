import { gql, useSubscription } from "@apollo/client";
import React from "react";
import { useEffect, useState } from "react";

interface Game {
    playerId: String,
    opponentId: String,
    data: any
}

const QUEUE_PLAYER = gql`
  subscription Subscription($game: String!) {
    playerConnected(game: $game) {
      playerId
      opponentId
      data
    }
  }   
  `;

  export default function Relay(props: any) {

      useEffect(() => {
        const child = React.Children.only(props.children).props;
        
        child.takeTurn = (data: any) => {
            
        };

        const { data, loading } = useSubscription<Game>(
            QUEUE_PLAYER,
            { variables: { game: props.game } }
        );
        
        useEffect(() => {
            child.setTurn(data?.data)
        }, [data]);

      }, [props.children]);

  }