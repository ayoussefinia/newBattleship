import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Board from './Board';
import TopLayout from './components/TopLayout/TopLayout';
import './Dots.css';


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

    function testCallback(e: any){
        console.log(e);
    }

    return (
        <div className='game-style'>
            <TopLayout/>
            <Board />

                
            
            <Box>
                <Container maxWidth="sm" sx={footerLayoutStyle}>
                    <div style={footerGroup}>
                        <Stack direction="row">
                            <p onClick={testCallback}>&#129324;</p>
                            <p>&#128514;</p>
                            <p>&#128077;</p>
                            <p>&#128520;</p>
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