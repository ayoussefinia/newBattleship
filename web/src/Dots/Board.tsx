import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Square from './components/Square';
import Line from './components/Line';
import Dot from './components/Dot';
import { CenterFocusStrong } from '@mui/icons-material';

// create board layout
const grid: JSX.Element[] = [];
let rowToggle = true; // 'true' -> dot-line row, 'false' -> line-square row
for (let i = 1; i < 82; i++){
    if (rowToggle) { 
        if (i % 2 == 1) {
            grid.push(
                <Grid item xs={25} >
                    <Dot></Dot>
                </Grid>
            );
        } else { // minimum HTML button height 7px
            grid.push(
                <Grid item xs={45} >
                    <Line value={i} width="40px" height="20px"></Line>
                </Grid>
            );
        }
    }else{ 
        if (i % 2 == 1) {
            grid.push(
                <Grid item xs={45} >
                    <Square></Square>
                </Grid>
            );
        } else { // minimum HTML button width 16px
            grid.push(
            <Grid item xs={25} >
                <Line value={i} width="20px" height="40px"></Line>
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
        <Box style={boxStyle}>
            <Grid container  width={305} height={305} columns={305} justifyContent={"center"}>
                {grid}
            </Grid>
        </Box>
    )
}
export default Board;


const boxStyle = {
    background: "grey",
    width: "305px",
    borderRadius: '1%',
};

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