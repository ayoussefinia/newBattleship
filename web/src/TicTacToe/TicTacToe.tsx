import Board from "./board";
import React, { EffectCallback, useEffect, useRef, useState} from "react";
import { gql, useSubscription } from "@apollo/client";

interface Game {
    playerId: String,
    opponentId: String,
    data: any
}

function Game( props: any) {
    
    const { data, loading } = useSubscription<Game>(
        QUEUE_PLAYER,
        { variables: { game: "tictactoe" } }
      );
      const [started, setStart] = useState(false);
      const [board, setTurn] = useState<Array<Array<boolean>>>([[],[],[]]);
      useEffect(() => {
        /* {
                playerId,
                opponentId,
                data: { 
                // custom data object
            }  */
        if(data?.data.start) setStart(true);
       
        if(data?.data.turn) {
            const newBoard: Array<Array<boolean>> = board;
            newBoard[data.data.row][data.data.col] = false;
            setTurn(newBoard);
        }
      } , [data]);

    return (started?<p>waiting to connect to another player.</p>:<div><Board turns={board} width={window.innerWidth} height={window.innerHeight}/><button onClick={props.exit}>Leave</button></div>);
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


function TicTacToe(this: any, exit: any) {


    this.game = <Game exit={exit} />;
    this.thumbnail = <div><h3>Tic Tac Toe</h3><Board width={256} height={200}/></div>;
    this.name = 'Tic Tac Toe';
}

export default TicTacToe;