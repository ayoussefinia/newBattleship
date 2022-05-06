import { useState } from 'react';

//let turn = 0;
const Line = ( props: any) => {
    const [disableButton, setDisableButton] = useState(false);
    const [lineColor, setLineColor] = useState('rgba(0,0,0,0)');

    const lineStyle = {
        background: lineColor,
        width: props.width,
        height: props.height,
        padding: '0',
        border: 'none',
        borderRadius: '8px' 
    };

    const containerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0)'
    }

    const lineClickHandler = ( event: any ) => { 
        //turn++;
        if(!disableButton){
            console.log(props.value);
            props.makeMove(props.value);
            setDisableButton(true);
            props.increment();
            setLineColor(props.color);
            //if (turn % 2 === 0){
            //    setLineColor("#FFFF6D");
            //} else {
            //    setLineColor("#12CDD4")
            //}
        }
    }

    return(
        <div style={containerStyle} onClick={lineClickHandler}>
            <button value={props.value} disabled={disableButton} style={lineStyle}/>
        </div>
    );
}

export default Line;