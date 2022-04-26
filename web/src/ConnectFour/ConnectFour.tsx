import Board from "./board";
//import React, { useState, useEffect, useRef} from "react";
import Connect4image from "../common/assets/images/Connect4image.png"

const gameBoard_height = 475;
const gameBoard_width = 550;
const gameBoard_offset = 1/44;
const gameBoard_spacing = 3/22;

const GAMEBOARD_EXAMPLE = [[0,0,0,0,0,0,0], 
                           [0,0,0,0,0,0,0],
                           [0,0,1,0,0,0,0],
                           [0,2,1,1,2,0,0],
                           [2,1,1,2,1,0,0],
                           [1,2,1,2,1,2,2]];

let gameboard = [[0,0,0,0,0,0,0], 
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]];

function Game(props:any){

    return<div><Board onClick={onClick} array={gameboard} width={gameBoard_width} height={gameBoard_height}/><button /*onClick={props.exit}*/>Leave</button></div>;
}

const ConnectFour = {
    game: <Game />,
    thumbnail: <div><h3>ConnectFour</h3><Board array={GAMEBOARD_EXAMPLE} width={256} height={200}/></div>,
    name: 'ConnectFour'
}

export default ConnectFour;

function FourInARow(x:number, y:number ):boolean{
    let count = 0;
    let i = -1;
    for(let j = -1; j <= 1; j++){
        if((NextInLine(x,y,i,j,count) + NextInLine(x,y,-i,-j,count)) >= 3){
            return true;
        }   
    }
    if((NextInLine(x,y, 0, -1, count) + NextInLine(x,y,0,1,count)) >= 3){
        return true;
    }
    return false;
}
/* It looks good, but the code only seems to work for rows of 4 where the index is an endpoint, 
   rather than a midpoint. ie. If a winning piece were to be inserted  into the 3rd slot in a row, 
   it would only maintain it's counter while cheking one direction, and reset it to '1' while chekcing 
   the other. I might be wrong, but if not, it might make sense to insert a 'NextInLine()' with adjusted 
   x/yIncrement values into the return 'false' 'if' and 'else' statements. This allows it to maintain the 
   counter and continue checking for a complete row in the opposite direction, but it would need an  
   additional condition to prevent it from repeating this process more than once.*/
   function NextInLine(x:number, y:number, xIncrement:number, yIncrement:number, count:number):number{
    let newX = x+xIncrement;
    let newY = y+yIncrement;
    if(newX < 0 || newY < 0 || newX > 5 || newY > 6){
        return count;
    }
    if(GAMEBOARD_EXAMPLE[newX][newY] === GAMEBOARD_EXAMPLE[x][y]){
        count = count+1;
        return NextInLine(newX, newY, xIncrement, yIncrement, count);
    }else{
        return count;
    }
}

function onClick(x:number, y:number){
    const offSet = gameBoard_width*gameBoard_offset;
    const spacing = gameBoard_width*gameBoard_spacing;
    let column:number = Math.trunc((x - offSet)/spacing);
    if(column > 6){column = 6;}
    alert('column = ' + column);
}