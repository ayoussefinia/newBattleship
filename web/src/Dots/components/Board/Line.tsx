import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Button';
import Container from '@mui/material/Button';
import { SportsRugbySharp } from '@mui/icons-material';

const Line = ( props: any) => {
    
    const [disableButton, setDisableButton] = useState(false);
    const [lineColor, setLineColor] = useState('#DF2E0C');

    const lineClickHandler=(event:any)=>{
        if(!disableButton){
            setDisableButton(true);
            //setLineColor("#54DF0C");
            //setLineColor("#12CDD4");
            setLineColor("#FFFF6D");
            console.log(props.value, props.width, props.height);
        }
    }
    
    const lineStyle = {
        background: lineColor,
        width: props.width,
        height: props.height,
        padding: '0',
        border: 'none'
        // border-radius ??lmk 
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0)'
    }

    return(
        <div style={containerStyle} onClick={lineClickHandler}>
            <button value={props.value} disabled={disableButton} 
            style={lineStyle}/>
        </div>
    );
}

export default Line;