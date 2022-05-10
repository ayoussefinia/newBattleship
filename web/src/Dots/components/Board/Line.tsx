import { useEffect, useState } from 'react';

const Line = ( props: any) => {
    const [lineColor, setLineColor] = useState("rgba(0,0,0,0)");
    const [live, setLive] = useState(props.live);

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
        if(!live){
            props.makeMove(props.value);
            setLive(true);
            props.increment();
        }
    }

    useEffect(() => {
        //console.log(live);
        setLineColor(live ? props.color : lineColor);
    }, [live]);

    return(
        <div style={containerStyle} onClick={lineClickHandler}>
            <button value={props.value} style={lineStyle}/>
        </div>
    );
}

export default Line;