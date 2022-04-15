const squareStyle = {
    background: 'blue',
    height: '100%',
    width: '100%',
};

const containerStyle = {
    height: '15vh',
    width: '100%'
}

const Square = () => {
    return(
        <div style={containerStyle}>
            <div style={squareStyle}></div>
        </div>
    );
}

export default Square;

//import React, { Component, ReactElement, useState } from 'react';