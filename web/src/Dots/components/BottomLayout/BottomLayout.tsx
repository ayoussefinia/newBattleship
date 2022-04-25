import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Emojis } from '../../../common/emojis';

export default function BottomLayout(props: any) {
    const [emojis, setEmojis] = useState([Emojis.Smiley, Emojis.Mocking, 
        Emojis.Freezing, Emojis.ThumpsUp, Emojis.Crushed,
        Emojis.Sneaky]);

    const footerLayout = {
        //display: 'grid',
        //gridTemplateColumns: 'auto',
        //gridTemplateRows: '[row1] 50% [row1-end row2-start] 50% [row2-end]',
        //rowGap: '35%'
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '0px'
    }
    
    const footerButtons = {
        width: '50%', 
        background: 'blue',
        height: '3em'
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
                    <Stack direction="row" spacing={2} sx={{justifyContent: 'center', alignItems: 'start', maxHeight: '50%'}}>
                        {emojis.map((emoji, i) => 
                            <div className="emoji emoji-lrg" key={i} onClick={() => passEmoji(emoji)}>{emoji}</div>
                        )}
                    </Stack>
                </div>
                <div className="footer-group button-container">
                    <Stack direction="row" spacing={3} sx={{width: '100%'}}>
                        <Button variant="contained" onClick={muteButtonHandler} sx={footerButtons}>Mute</Button>
                        <Button variant="contained" onClick={props.exit} sx={footerButtons}>Leave</Button>
                    </Stack>
                </div>
            </Container>
        </Box>
        
    );
} 