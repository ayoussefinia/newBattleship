import Board from "./board";
import React, { useEffect, useRef} from "react";

const GAMEBOARD_EXAMPLE = [[0,0,0,0,0,0,0], 
                           [0,0,0,0,0,0,0],
                           [0,0,1,0,0,0,0],
                           [0,2,1,1,2,0,0],
                           [2,1,1,2,1,0,0],
                           [1,2,1,2,1,2,2]];

function Game(props:any){
    return(<div><Board width={550} height={475}/><button onClick={props.exit}>Leave</button></div>);
}

function ConnectFour(this:any, exit:any){
    this.game = <Game exit={exit}/>;
    this.thumbnail = <div><h3>ConnectFour</h3><Board array={GAMEBOARD_EXAMPLE} width={256} height={200}/></div>;
    this.name = 'ConnectFour';
}

export default ConnectFour;