import Board from "./board";
import React, { EffectCallback, useEffect, useRef, useState} from "react";
import { gql, useSubscription } from "@apollo/client";

interface Turn {
    row:number,
    col:number
}

function Game(props: any) {
    const [board, setBoard] = useState<Array<Array<string>>>([['o','x','x'],['x','x','x'],['x','x','x']]);
    const [turn, takeTurn] = useState<Turn | null>(null);
    
    useEffect(() => {
        props.takeTurn(turn);
    }, [turn]);

    props.setTurn = (data: Turn) => {
        const newBoard = board;
        board[data.row][data.col] = 'x';
        setBoard(board);
    };
      
    return (!board?<p>waiting to connect to another player.</p>:<div><Board board={board} takeTurn={takeTurn} width={window.innerWidth} height={window.innerHeight}/><button onClick={props.exit}>Leave</button></div>);
}


function TicTacToe(this: any, exit: any) {


    this.game = <Game exit={exit} />;
    this.thumbnail = <div><h3>Tic Tac Toe</h3><Board width={256} height={200}/></div>;
    this.name = 'Tic Tac Toe';
}

export default TicTacToe;