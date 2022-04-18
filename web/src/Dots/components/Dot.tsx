const dotStyle = {
    background: 'purple',
    borderRadius: '50%',
    height: '100%',
    width: '100%',
};

const containerStyle = {
    height: '4rem',
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