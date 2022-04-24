import { flexbox } from "@mui/system";

const Square = (props: any) => {
    const squareContainerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    const squareStyle = {
        background: 'rgba(0,0,0,0)',
        height: props.width,
        width: props.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return(
        <div style={squareContainerStyle}>
            <div style={squareStyle}>{props.label}</div>
        </div>
    );
}

export default Square;

//import React, { Component, ReactElement, useState } from 'react';