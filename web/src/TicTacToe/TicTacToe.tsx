import Board from "./board";
import React, { useRef} from "react";

function game( props: any) {
    return (<Board width={128} height={128}/>);
} 

const TicTacToe = {
    game: game,
    thumbnail: <div><h3>Tic Tac Toe</h3><Board width={128} height={128}/></div>,
    name: 'Tic Tac Toe'
}

export default TicTacToe;