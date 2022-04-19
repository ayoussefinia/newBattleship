import React, { Component, ReactElement, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Square from './components/Square';
import Line from './components/Line';
import Dot from './components/Dot';
import GameControl from './GameControl';
import { ConstructionOutlined, ConstructionRounded } from '@mui/icons-material';

const grid_size = 5; // EDIT TO CHANGE GRID SIZE. In terms of dots, grid_size x grid_size

const size = (grid_size + grid_size - 1) * (grid_size + grid_size - 1);

// helper function - increment char to next ascii value
function nextChar(c: string) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

// create board layout
const grid: JSX.Element[] = [];

// no need for a true graph data structure to manage game logic, 3 maps will be used to execute the game logic encapsulated in the GameControl class
const controller = new GameControl();

let rowToggle = true; // 'true' -> dot-line row, 'false' -> line-square row
for (let i = 1; i < (size+1); i++){
    if (rowToggle) { 
        if (i % 2 == 1) {
            // the 'xs' value needs to update with the given grid size: TODO
            grid.push(
                <Grid item xs={0.8} >
                    <Dot></Dot>
                </Grid>
            );
        } else { 
            grid.push(
                <Grid item xs={2} >
                    <Line value={i} width="100%" height="2px"></Line>
                </Grid>
            );
        }
    }else{ 
        if (i % 2 == 1) {
            grid.push(
                <Grid item xs={2} >
                    <Square></Square>
                </Grid>
            );
        } else { 
            grid.push(
            <Grid item xs={0.8} >
                <Line value={i} width="2px" height="90%"></Line>
            </Grid>
            );
        }
    }
    if (i % 9 == 0) { // detect when building next gameboard row
        rowToggle = !rowToggle;
    }
}

// console log grid
//grid.map( elem => ( console.log(elem.props.children.type["name"])));

// Iterating over gameboard twice on initialization. The first time to build the game board grid, and the second time to set up the logic data structures

// assuming rectanglur game board
let dotCounter = 1;
let lineCounter = 1;
let boxLabel = 'A';
rowToggle = true;
let rowOffset = Math.sqrt(size);
let rowOffsetMinusOne = rowOffset - 1;
for(let i = 0; i < grid.length; i++){
    // go row by row, alternating row types like above
    let elem = grid[i].props.children.type["name"];

    if(rowToggle){ // dot - line rows
        
        if(elem == 'Dot'){
            if(i % rowOffset == 0 || i % rowOffsetMinusOne == 0){
                console.log(i);
                controller.addDot(dotCounter,{ type: 'corner', boxes: []});
            }
            dotCounter++;
        }else if(elem == 'Line'){
            controller.addLine(lineCounter.toString(), { endpoints: []});
            lineCounter++;
        }else{ // Box
            controller.addBox(boxLabel, { coords: [], owner: null, status: 0});
            boxLabel = nextChar(boxLabel);
        }
    }else{ // line - box rows

    }
    if (i % 9 == 0) { // detect when building next gameboard row
        rowToggle = !rowToggle;
    }
}

controller.printController();

const Board =( props: any )=> {
    const [gameGrid, setGameGrid] = useState(grid);

    return (
        <Box>
            <Grid container>
                {gameGrid}
            </Grid>
        </Box>
    )
}
export default Board;