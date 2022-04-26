import { gql, useMutation } from "@apollo/client";
import React, { useRef, useState} from "react";
import Canvas from "../common/canvas";


export default function Board(props: any) {
    // useMutation(TAKE_TURN, { playerId: 'asdf', opponentId: 'asdf', data: JSON.stringify({
    //     row:2, col: 1
    // })});
    // https://simon.html5.org/dump/html5-canvas-cheat-sheet.html

    function line(x1: number, x2: number, y1: number, y2: number, ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(x1*props.width/3, y1*props.height/3);
        ctx.lineTo(x2*props.width/3, y2*props.height/3);
        ctx.stroke();
    }

    function drawBoard(ctx : CanvasRenderingContext2D) {  
        ctx.strokeStyle= 'rgb(0,0,0)';
        ctx.lineCap = "round";
        ctx.lineWidth = 5;

        line(1,1,0.1,2.8,ctx);
        line(2,2,0.1,2.8,ctx);
        line(0.1,2.9,1,1,ctx);
        line(0.1,2.9,2,2,ctx);
    }

    const onClicked = (x: number, y: number) => {

    }

    return (<Canvas clicked={onClicked} draw={drawBoard} height={props.height} width={props.width} />);
}