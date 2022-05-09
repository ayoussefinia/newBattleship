import Board from "./board";
import React, { EffectCallback, useEffect, useRef, useState} from "react";
import { gql, useSubscription } from "@apollo/client";

interface Turn {
    row:number,
    col:number
}

function getFrameBounds() {
   return Math.min(window.innerWidth, window.innerHeight)
}

const emptyBoard = [[null,null,null],[null,null,null],[null,null,null]];

function Game(props: any) {
    const [board, setBoard] = useState<Array<Array<boolean | null>>>(emptyBoard);
    
    const setTurn = (data: Turn) => {
        if(data) {
            const newBoard = board;
            newBoard[data.row][data.col] = false;
            setBoard(newBoard);
        } else {
            setBoard(emptyBoard);
        }
    };

    // Incoming Turn
    useEffect(() => {
        setTurn(props.turn);
    }, [props.turn]);
      
    const clicked = (x: number, y: number) => {
        const turnX = Math.floor(x/getFrameBounds());
        const turnY = Math.floor(y/getFrameBounds());
        const newTurn = { row: turnX, col: turnY };
        if(board[newTurn.row][newTurn.col] === null) {
            setTurn(newTurn);
            props.turn = newTurn;
        }
    }

    return (<div><Board board={board} clicked={clicked} width={getFrameBounds()} height={getFrameBounds()}/><button onClick={props.exit}>Leave</button></div>);
}


const TicTacToe = {
    game: <Game />,
    thumbnail: <div><h3>Tic Tac Toe</h3><p> </p><Board clicked={() => {}} board={[[true,null,null],[null,false,null],[null,null,true]]} width={256} height={200}/></div>,
    name: 'Tic Tac Toe'
}

export default TicTacToe;