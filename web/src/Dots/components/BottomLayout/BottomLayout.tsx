import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Emojis } from '../../../common/emojis';

export default function BottomLayout(props: any) {
    const [emojis, setEmojis] = useState([ Emojis.Freezing, 
        Emojis.ThumpsUp, Emojis.Devil,
        Emojis.Sneaky]);

    const footerLayout = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '0px'
    }
    
    const footerButtons = {
        width: '37.5%', 
        background: 'white',
        height: '2.5em',
        color: 'black',
        fontFamily: 'OpenSans',
        fontSize: '1.25rem',
        fontWeight: '600',
        borderRadius: '10px'
    }

    // how to pass data from child to parent
    function muteButtonHandler() {
        props.mute();
    }

    function passEmoji(e: string) {
        props.sendEmot(e);
    }

    return (
        
        <Box sx={{width: '100%', height: '100%', display: 'flex', alignItems: 'center'}}>
            <Container maxWidth="sm" sx={footerLayout}>
                <div className="footer-group emoji-container">
                    <Stack direction="row" spacing={4} sx={{justifyContent: 'center', alignItems: 'start', maxHeight: '50%'}}>
                        {emojis.map((emoji, i) => 
                            <div className="emoji emoji-lrg" key={i} onClick={() => passEmoji(emoji)}>{emoji}</div>
                        )}
                    </Stack>
                </div>
                <div className="footer-group button-container">
                    <Stack direction="row" spacing={5} sx={{width: '100%', justifyContent: 'center'}}>
                        <Button variant="contained" onClick={muteButtonHandler} sx={footerButtons}>Mute</Button>
                        <Button variant="contained" onClick={props.exit} sx={footerButtons}>Leave</Button>
                    </Stack>
                </div>
            </Container>
        </Box>
        
    );
} 