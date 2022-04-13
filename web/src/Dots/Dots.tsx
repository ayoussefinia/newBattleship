import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Board from '../Dots/Board';

function DotsGame( props: any) {
    return (
        <div>
            <Box sx={{width: '80vw', height: 500}}>
                <Container maxWidth="lg">
                    <Board width='75vw' height='75vh'/>
                    <button onClick={props.exit}>Leave</button>
                </Container>
            </Box>
        </div>
    );
}

function Dots(this: any, exit: any) {
    this.game = <DotsGame exit={exit} />;
    this.thumbnail = <div><h3>Dots</h3><Board width={256} height={200}/></div>;
    this.name = 'Dots';
}

export default Dots;