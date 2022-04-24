import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Emojis } from '../../../common/emojis';

const footerLayout = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: '[row1] 50% [row1-end row2-start] 50% [row2-end]',
    rowGap: '40%'
}

const footerGroup = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
}

export default function BottomLayout(props: any) {
    const [emojis, setEmojis] = useState([Emojis.Smiley, Emojis.Mocking, 
        Emojis.Freezing, Emojis.ThumpsUp, Emojis.Crushed,
        Emojis.Sneaky]);

    // how to pass data from child to parent
    function muteButtonHandler() {
        props.mute(5);
    }

    return (
        <div>
            <Box>
                <Container maxWidth="sm" sx={footerLayout}>
                    <div style={footerGroup}>
                        <Stack direction="row" spacing={2}>
                            {emojis.map((emoji, i) => 
                                <div className="emoji" key={i}>{emoji}</div>
                            )}
                        </Stack>
                    </div>
                    <div style={footerGroup}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={muteButtonHandler}>Mute</Button>
                            <Button variant="contained" onClick={props.exit}>Leave</Button>
                        </Stack>
                    </div>
                </Container>
            </Box>
        </div>
    );
} 