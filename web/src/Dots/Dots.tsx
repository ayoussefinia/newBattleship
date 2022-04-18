import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Board from '../Dots/Board';

const pageWidth = '100%';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column' as 'column'
}

const topSectionStyle = {
    width: pageWidth,
    height: '30vh'
}

const gameBoardStyle = {
    width: pageWidth,
    maxHeight: 'auto',
    display: 'flex',
    justifyContent: 'center'
}

const buttonFooterStyle = {
    width: pageWidth,
    height: '20vh'
}

function DotsGame( props: any) {
    return (
        <div style={containerStyle}>
            <Box sx={topSectionStyle}></Box>
            <Box sx={gameBoardStyle}>
                <Container maxWidth="sm">
                    <Board width='90%' height='100%'/>
                </Container>
            </Box>
            <Box sx={buttonFooterStyle}>
                <Container maxWidth="sm">
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