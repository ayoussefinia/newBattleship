import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Square from './components/Square';
import Line from './components/Line';
import Dot from './components/Dot';
import GameControl from './GameControl';

const grid_size = 5; // EDIT TO CHANGE GRID SIZE. In terms of dots, grid_size x grid_size

// define game board layout grid setting from grid size
const size = (grid_size + grid_size - 1) * (grid_size + grid_size - 1); // compute real element cardinality for JSX Element array
const rowOffset = Math.sqrt(size); // used when iterating the game board

// compute the ratio value to use for mui grid
let t = grid_size - 1;
let gridLong = t;
let tmp = t * gridLong;
if(tmp < 12){
    gridLong *= 2;
}

tmp = t * gridLong;
while(tmp >= 12){
   gridLong--;
   tmp = t * gridLong;
}
let gridShort = (12 - tmp) / grid_size;

// helper function - increment char to next ascii value
function nextChar(c: string) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

// create board layout
const grid: JSX.Element[] = [];

// no need for a true graph data structure to manage game logic, 3 maps will be used to execute the game logic encapsulated in the GameControl class
const controller = new GameControl();

let rowToggle = true; // 'true' -> dot-line row, 'false' -> line-square row
let lc = 1;
for (let i = 1; i < (size+1); i++){
    if (rowToggle) { 
        if (i % 2 === 1) {
            // the 'xs' value needs to update with the given grid size: TODO
            grid.push(
                <Grid key={i} item xs={gridShort} >
                    <Dot></Dot>
                </Grid>
            );
        } else { 
            grid.push(
                <Grid key={i} item xs={gridLong} >
                    <Line value={lc.toString()} width="100%" height="2px"></Line>
                </Grid>
            );
            lc++;
        }
    }else{ 
        if (i % 2 === 1) {
            grid.push(
                <Grid key={i} item xs={gridLong} >
                    <Square></Square>
                </Grid>
            );
        } else { 
            grid.push(
                <Grid key={i} item xs={gridShort} >
                    <Line value={lc.toString()} width="2px" height="90%"></Line>
                </Grid>
            );
            lc++;
        }
    }
    if (i % rowOffset === 0) { // detect when building next gameboard row
        rowToggle = !rowToggle;
    }
}

// console log grid
//grid.map( elem => ( console.log(elem.props.children.type["name"])));
console.log(grid);

// Iterating over gameboard twice on initialization. The first time to build the game board grid, and the second time to set up the logic data structures

// assuming rectanglur game board
rowToggle = true;
let queue: number[] = [];
let dotCounter = 1;
let lineCounter = 1;
let boxLabel = 'A';
let columnCounter = 0;
let rowCounter = 1;
console.log("grid size:", size);
for(let i = 1; i < (size+1); i++){
    // go row by row, alternating row types like above
    let elem = grid[i-1].props.children.type["name"];

    if(rowToggle){ // (dot - line) rows
        if(elem === 'Dot'){
            //console.log("column counter:", columnCounter);
            if((rowCounter === 1 || rowCounter === rowOffset) && (columnCounter === 0 || columnCounter === (rowOffset-1))){
                controller.addDot(dotCounter,{ type: 'corner', boxes: []});
            }else{
                //console.log("row counter:", rowCounter);
                if((rowCounter === 1 || rowCounter === rowOffset) || (columnCounter === 0 || columnCounter === (rowOffset-1))){
                    controller.addDot(dotCounter, {type: 'border', boxes: []});
                }else{
                    controller.addDot(dotCounter, {type: 'inner', boxes: []});
                }
            }
            //console.log("dot counter:", dotCounter);
            queue.push(dotCounter);
            dotCounter++;
        }else if(elem === 'Line'){
            controller.addLine(lineCounter.toString(), { endpoints: [dotCounter-1, dotCounter]});
            lineCounter++;
        }
    }else{ // (line - box) rows
        if(elem === 'Line'){
            let top = queue[0];
            queue.shift();
            controller.addLine(lineCounter.toString(), { endpoints: [top, top+grid_size]});
            lineCounter++;
        }else if(elem === 'Square'){
            controller.addBox(boxLabel, { coords: [], owner: null, status: 0});
            boxLabel = nextChar(boxLabel);
        }
    }
    columnCounter++;
    if (i % rowOffset === 0) { // detect when building next gameboard row
        rowToggle = !rowToggle;
        columnCounter = 0;
        rowCounter++;
    }
}

controller.printController();

const Board =( props: any )=> {
    const [gameGrid, setGameGrid] = useState(grid);

    useEffect(() => {
        setGameGrid(grid);
    });
    
    return (
        <Box>
            <Grid container>
                {gameGrid}
            </Grid>
        </Box>
    )
}
export default Board;