import { useEffect, useState } from 'react';

//let turn = 0;
const Line = ( props: any) => {
    const [disableButton, setDisableButton] = useState(false);
    const [lineColor, setLineColor] = useState('rgba(0,0,0,0)');
    const [live, setLive] = useState(props.live);

    console.log(props);
    

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

    function lineClickHandler( event: any ) { 
        console.log(props);
        
        if(!disableButton){
            console.log(props.value);
            props.makeMove(props.value);
            setLive(true);
            setDisableButton(true);
            props.increment();
        }
    }

    useEffect(() => {
        setLineColor(live ? props.color : lineColor);
        //console.log(live);
    }, [live]);

    useEffect(() => {
        //console.log("liveness changed!");
        setLive(props.live);
    }, [props.live]);

    useEffect(() => {
        //console.log(props);
    }, []);

    return(
        <div style={containerStyle} onClick={lineClickHandler}>
            <button value={props.value} disabled={disableButton} style={lineStyle}/>
        </div>
    );
}

export default Line;