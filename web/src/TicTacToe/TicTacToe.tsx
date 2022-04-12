import Board from "./board";
import React, { useEffect, useRef} from "react";

function Game( props: any) {
    
    useEffect(() => {
       props.exit();
    });

    return (<Board width={128} height={128}/>);
}

function TicTacToe(this: any, exit: any) {
    this.game = <Game exit={exit} />;
    this.thumbnail = <div><h3>Tic Tac Toe</h3><Board width={128} height={128}/></div>;
    this.name = 'Tic Tac Toe';
}

export default TicTacToe;