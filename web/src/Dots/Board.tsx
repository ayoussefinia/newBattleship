import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Square from './components/Square';
import Line from './components/Line';
import Dot from './components/Dot';
import Graph from './Graph';

// create board layout
const grid: JSX.Element[] = [];
// initialize game data structures - incapsulate in the graph file?
const gameGraph = new Graph();
const boxes = new Map();

let rowToggle = true; // 'true' -> dot-line row, 'false' -> line-square row
for (let i = 1; i < 82; i++){
    if (rowToggle) { 
        if (i % 2 == 1) {
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
                <Line value={i} width="2px" height="100%"></Line>
            </Grid>
            );
        }
    }
    if (i % 9 == 0) {     // detect when building next gameboard row
        rowToggle = !rowToggle;
    }
}
const Board =( props: any )=> {
    return (
        <Box>
            <Grid container>
                {grid}
            </Grid>
        </Box>
    )
}
export default Board;

//import { styled } from '@mui/material/styles';
//import React, { Component, ReactElement, useState } from 'react';
//import {useState } from 'react';

 //const [gameGrid, setGameGrid] = useState(grid);

//sx={{flexGrow: 1, height: props.height, width: props.width, justifyContent: 'center' }}
// rowSpacing={.25} columnSpacing={.25}

/*const gridStyle = {
    background: 'red',
    height: '30px'
};*/


  /*if (i % 9 == 0) {
        for (let x = 0; x < 9; x++){ //?    
            if (x % 2 == 0) {
                grid.push(
                    <Line></Line>
                );
            } else {
                grid.push(
                    <Square></Square>
                );      
            }
        }

    }else {
        if (i % 2 == 0) {
            grid.push(
                <Dot></Dot>
            );
        } else {
            grid.push(
                <Line></Line>
            );      
        }
    }
*/