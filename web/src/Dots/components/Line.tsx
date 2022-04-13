import React, { Component, ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';

const Line = ( props: any) => {
    // 'h' - horizontal, 'v' - vertical
    const [orientationHorizontal, setOrientation] = useState(props.horizontal);
    const [disableButton, setDisableButton] = useState(false);
    
    return(
        <Button disabled={disableButton} 
            sx={{
                width: orientationHorizontal ? '5rem' : '1rem',
                height: orientationHorizontal ? '1rem' : '5rem',
                background: red,
            }}
        />
    );
}

export default Line;