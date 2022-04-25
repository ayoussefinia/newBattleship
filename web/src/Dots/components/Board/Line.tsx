import { useState } from 'react';

let turn = 0;
const Line = ( props: any) => {
    
    const [disableButton, setDisableButton] = useState(false);
    const [lineColor, setLineColor] = useState('#DF2E0C');

    const lineClickHandler=(event:any)=>{
        turn++;
        if(!disableButton){
            setDisableButton(true);
            //setLineColor("#54DF0C");
            //setLineColor("#12CDD4");
            props.increment();
            if (turn % 2 === 0){
                setLineColor("#FFFF6D");
            } else {
                setLineColor("#12CDD4")
            }
            //console.log(props.value, props.width, props.height);
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