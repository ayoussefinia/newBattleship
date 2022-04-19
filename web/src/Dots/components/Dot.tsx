const dotStyle = {
    background: 'purple',
    borderRadius: '50%',
    height: '25px',
    width: '25px'
};

const containerStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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