import React, { useRef, useState} from "react";
import Canvas from "../common/canvas";

export default function Board( props: any) {

    // https://simon.html5.org/dump/html5-canvas-cheat-sheet.html

    function drawBoard(ctx : CanvasRenderingContext2D) {  
            
         ctx.beginPath();
         ctx.moveTo(props.width/3, 0);
         ctx.strokeStyle= 'rgb(0,0,0)';
         ctx.lineCap = "round";
         ctx.lineWidth = 5;
         ctx.lineTo(props.width/3, props.height);
         ctx.stroke();
        
    }

    return (<Canvas draw={drawBoard} height={props.height} width={props.width}/>);

}