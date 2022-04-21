import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';
import Container from '@mui/material/Button';

const Line = ( props: any) => {
    
    const [disableButton, setDisableButton] = useState(false);
    const [lineColor, setLineColor] = useState("white");

    const lineClickHandler=(event:any)=>{
        setDisableButton(true);
        setLineColor("#1de2ae");
        console.log(props.value, props.width, props.height);
    }
    
    const lineStyle = {
        background: lineColor,
        width: props.width,
        height: props.height,
        padding: '0'
        // border-radius ??lmk 
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return(
        <div style={containerStyle} onClick={lineClickHandler}>
            <button value={props.value} disabled={disableButton} 
            style={lineStyle}/>
        </div>
    );
}

export default Line;