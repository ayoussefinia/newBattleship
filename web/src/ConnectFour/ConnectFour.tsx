import { Rowing } from "@mui/icons-material";
import {useState, useEffect} from 'react'
import Board from "./board";
//import React, { useState, useEffect, useRef} from "react";

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

let gameboard_empty = [[0,0,0,0,0,0,0], 
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0]];


function Game(props:any){
    let [turn, takeTurn] = useState(0);
    let [gameboard, setGameboard] = useState(gameboard_empty);
    let row = 0;
    

    function FourInARow(column:number, row:number):boolean{
        let count = 0;
        let i = -1;
        let player:number;
        if(gameboard[column][row] !== 0){
            player = gameboard[column][row];
        }else{
            return false;
        }
        for(let j = -1; j <= 1; j++){
            console.log("Looking at "+ gameboard[column][row] + " at " + column + ", " + row);
            if((NextInLine(column,row,i,j,count, player) + NextInLine(column,row,-i,-j,count,player)) >= 3){
                return true;
            }   
        }
        if((NextInLine(column,row, 0, -1, count,player) + NextInLine(column,row,0,1,count,player)) >= 3){
            return true;
        }
        return false;
    }

    function NextInLine(row:number, column:number, xIncrement:number, yIncrement:number, count:number, player:number):number{
        let newRow = row+xIncrement;
        let newColumn = column+yIncrement;
        if(newRow < 0 || newColumn < 0 || newRow > 5 || newColumn > 6){
            return count;
        }
        if(gameboard[newRow][newColumn] === player){
            count = count+1;
            return NextInLine(newRow, newColumn, xIncrement, yIncrement, count,player);
        }else{
            return count;
        }
    }

    function dropToken(column: number, board:number[][]):number[][]{

    // A [for-loop] which checks for the first empty index in a given column and updates it's value.
    for (let i = 5; i >= 0 ; i--) {
        if (!board[i][column]) {
            board[i][column] = 1 ; // in a real game this would be the player number.
            //row = i * -1 + 6;
            row = i;
            break;
        }
    }
    return board;
}

    function onClick(x:number, y:number){
        const offSet = gameBoard_width*gameBoard_offset;
        const spacing = gameBoard_width*gameBoard_spacing;
        let column:number = Math.trunc((x - offSet)/spacing)-1;
        console.log(column);
        if(column > 6){column = 6;}
        takeTurn(column);
        updateBoard(turn);
        if (FourInARow(row, turn)) {
            console.log("winner");
        }
       
    }

    useEffect(() =>{
        updateBoard(props.turn);
    },[props.turn])
    
    

    /*props.setTurn = (data:number) =>{
        let newboard = gameboard;
        newboard = dropToken(data, newboard);
        setGameboard(newboard);
    };*/
    function updateBoard(location:number) {
        //props.takeTurn(turn);
        let newboard = gameboard;
        newboard = dropToken(location, newboard);
        setGameboard(newboard);
        console.log("gameboard set"); //Test to ensure the gameboard was updated.
        
}
    


    return<div><Board onClick={onClick} array={gameboard} width={gameBoard_width} height={gameBoard_height}/><button /*onClick={props.exit}*/>Leave</button></div>;

    
}

const ConnectFour = {
    game: <Game />,
    thumbnail: <div><h3>ConnectFour</h3><Board onClick={() => {}} array={GAMEBOARD_EXAMPLE} width={256} height={200}/></div>,
    name: 'ConnectFour'
}

export default ConnectFour;





   


