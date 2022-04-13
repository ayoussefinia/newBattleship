import React, { Component, ReactElement, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Square from './components/Square';
import Line from './components/Line';
import Dot from './components/Dot';


const gridStyle = {
    background: 'red',
    height: '30px'
};

// create board layout
const grid: JSX.Element[] = [];
let rowToggle = true; // 'true' -> dot-line row, 'false' -> line-square row
for (let i = 0; i < 81; i++){
    if (rowToggle) { // dot/line row
        if (i % 2 == 1) {
            grid.push(
                <Grid item xs={0.8}>
                    <Dot></Dot>
                </Grid>
            );
        } else if (i % 2 == 0) {
            grid.push(
                <Grid item xs={2}>
                    <Line horizontal="true"></Line>
                </Grid>
            );
        }
    }else{ // square/line row
        if (i % 2 == 1) {
            grid.push(
                <Grid item xs={2}>
                    <Line horizontal="false"></Line>
                </Grid>
            );
        } else if (i % 2 == 0) {
            grid.push(
                <Grid item xs={0.8}>
                    <Square></Square>
                </Grid>
            );
        }
    }

    // detect when building next gameboard row
    if (i % 9 == 0) {
        rowToggle = !rowToggle;
    }
}
    /*if (i % 9 == 0) {
        or (let x = 0; x < 9; x++){ //?    
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
}*/


function Board( props: any ) {
    const [gameGrid, setGameGrid] = useState(grid);

    return (
        <Box sx={{flexGrow: 1, height: props.height, width: props.width, justifyContent: 'center' }}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {gameGrid}
            </Grid>
        </Box>
    )

    /*return (
        <div>Hello Dots</div>
    )*/
}

export default Board;