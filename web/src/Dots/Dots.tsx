import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Board from '../Dots/Board';

const gridStyle = {
    color: 'red',
    height: '200px'
};

function Game( props: any) {
    return (<div><Board width={1000} height={1000}/><button onClick={props.exit}>Leave</button></div>);
}

function Dots(this: any, exit: any) {
    const grid: JSX.Element[] = [];
    this.game = <Game exit={exit} />;
    this.thumbnail = <div><h3>Dots</h3><Board width={256} height={200}/></div>;
    this.name = 'Tic Tac Toe';

    for (let i = 0; i < 25; i++){
        grid.push(
            <Grid item xs={2.4}>
                <div style={gridStyle}></div>
            </Grid>
        );
    }

    /*return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={0}>
                {grid}
            </Grid>
        </Box>
    )*/
}

export default Dots;