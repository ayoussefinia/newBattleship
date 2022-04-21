import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Board from '../Dots/Board';

const pageWidth = '100%';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column' as 'column',
    background: '#DF2E0C',
    height: '100vh',
    maxHeight: '100vh'
}

const topSectionStyle = {
    width: pageWidth,
    height: 'auto'
}

const gameBoardStyle = {
    width: pageWidth,
    maxHeight: 'auto',
    display: 'flex',
    justifyContent: 'center'
}

const buttonFooterStyle = {
    width: pageWidth,
    height: '100%'
}

const footerLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: '[row1] 50% [row1-end row2-start] 50% [row2-end]'
}

const footerGroup = {
    display: 'flex',
    justifyContent: 'center'
}

function DotsGame( props: any) {

    function mutePlayer(){

    }

    return (
        <div style={containerStyle}>
            <Box sx={gameBoardStyle}>
                <Container maxWidth="sm">
                    <Board width='90%' height='100%'/>
                </Container>
            </Box>
            <Box sx={buttonFooterStyle}>
                <Container maxWidth="sm" sx={footerLayoutStyle}>
                    <div style={footerGroup}>
                        <Stack direction="row">
                            <p>&#129324</p>
                            <p>&#128514</p>
                            <p>&#128077</p>
                            <p>&#128520</p>
                        </Stack>
                    </div>
                    <div style={footerGroup}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={mutePlayer}>Mute</Button>
                            <Button variant="contained" onClick={props.exit}>Leave</Button>
                        </Stack>
                    </div>
                </Container>
            </Box>
        </div>
    );
}

function Dots(this: any, exit: any) {
    this.game = <DotsGame exit={exit} />;
    this.thumbnail = 
        <div>
            <h3 style={{marginBottom: '0.2rem'}}>Dots</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={process.env.PUBLIC_URL + '/dots-thumbnail.png'} alt="dots-thumbnail" style={{width: '80%', height: '80%', borderRadius: '20px'}}/>
            </div>
        </div>;
    this.name = 'Dots';
}

export default Dots;