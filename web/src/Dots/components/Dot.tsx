const dotStyle = {
    background: 'purple',
    borderRadius: '50%',
    height: '20px',
    width: '20px'
};

const containerStyle = {
    height: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
}

const Dot = () => {

    return(
        <div style={containerStyle}>
            <div style={dotStyle}></div>
        </div>
    );
}

export default Dot;

//import React, { Component, ReactElement, useState } from 'react';