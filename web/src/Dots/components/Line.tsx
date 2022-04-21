import {useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';
import Container from '@mui/material/Button';
const Line = ( props: any) => {
    
    const [disableButton, setDisableButton] = useState(false);
    const [lineColor, setLineColor] = useState("white");

    const lineClickHandler=(event:any)=>{
        setDisableButton(true);
        setLineColor("red");
        console.log(event.target.value, props.width, props.height);
    }
    
    const lineStyle = {
        background: lineColor,
        width: props.width,
        height: props.height,
        borderRadius: '25%',
    };
    return(
        <button value={props.value} onClick={lineClickHandler} disabled={disableButton} 
        style={lineStyle}
        
        />
    );
}

export default Line;

// 'h' - horizontal, 'v' - vertical
//import { red } from '@mui/material/colors';
// import React, {Component, ReactElement, useState } from 'react';  

 //const [orientationHorizontal, setOrientation] = useState();

        /*sx={{
                width:   "12px", //props.width,    //? '75px' : '12px',
                height:    "75px"//props.height   //? '12px' : '75px',//on 12.5px the height of row 2-9 lines change but not for row 1 lines 
                                                                //12px is the minimum height anything under 12 stays the same                
            }}*/