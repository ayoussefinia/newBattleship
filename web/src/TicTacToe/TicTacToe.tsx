import Board from "./board";
import React, { EffectCallback, useEffect, useRef, useState} from "react";
import { gql, useSubscription } from "@apollo/client";
// import ExampleMuation from '../ExampleMutation'

interface Turn {
    row:number,
    col:number
}

function Game(props: any) {
    const [board, setBoard] = useState<Array<Array<boolean | null>>>([[null,false,true],[false,null,true],[true,false,null]]);
    const [turn, takeTurn] = useState<Turn | null>(null);
    
    useEffect(() => {
        props.takeTurn(turn);
    }, [turn]);

    props.setTurn = (data: Turn) => {
        const newBoard = board;
        newBoard[data.row][data.col] = false;
        setBoard(newBoard);
    };
      
    return (
    <div>
        <Board board={board} takeTurn={takeTurn} width={window.innerWidth} height={window.innerHeight}/>
        <button onClick={props.exit}>Leave</button>
    </div>);
}


const TicTacToe = {
    game: <Game />,
    thumbnail: <div><h3>Tic Tac Toe</h3><p> </p><Board width={256} height={200}/></div>,
    name: 'Tic Tac Toe'
}

export default TicTacToe;