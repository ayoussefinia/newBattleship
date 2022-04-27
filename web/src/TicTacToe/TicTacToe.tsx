import Board from "./board";
import React, { EffectCallback, useEffect, useRef, useState} from "react";
import { gql, useSubscription } from "@apollo/client";

interface Turn {
    row:number,
    col:number
}

function Game(props: any) {
    const [board, setBoard] = useState<Array<Array<boolean | null>>>([[null,null,null],[null,null,null],[null,null,null]]);
    const [turn, takeTurn] = useState<Turn | null>(null);
    
    const setTurn = (data: Turn) => {
        const newBoard = board;
        newBoard[data.row][data.col] = false;
        setBoard(newBoard);
    };

    // Incoming Turn
    useEffect(() => {
        setTurn(props.turn);
    }, [props.turn]);

    // Outoging turn
    useEffect(() => {
        props.takeTurn(turn);
    }, [turn]);
      
    return (<div><Board board={board} width={window.innerWidth} height={window.innerHeight}/><button onClick={props.exit}>Leave</button></div>);
}


const TicTacToe = {
    game: <Game />,
    thumbnail: <div><h3>Tic Tac Toe</h3><p> </p><Board board={[[true,null,null],[null,false,null],[null,null,true]]} width={256} height={200}/></div>,
    name: 'Tic Tac Toe'
}

export default TicTacToe;