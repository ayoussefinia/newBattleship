import Board from "./board";
import React, { useEffect, useRef} from "react";

function Game( props: any) {
    
    return (<div><Board width={1000} height={1000}/><button onClick={props.exit}>Leave</button></div>);
}

function TicTacToe(this: any, exit: any) {
    this.game = <Game exit={exit} />;
    this.thumbnail = <div><h3>Tic Tac Toe</h3><Board width={256} height={200}/></div>;
    this.name = 'Tic Tac Toe';
}

export default TicTacToe;