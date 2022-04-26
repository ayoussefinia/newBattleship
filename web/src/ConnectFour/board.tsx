import React from 'react'
import Canvas from '../common/canvas' 

const GAMEBOARD_ROWS = [2/22, 5/22, 8/22, 11/22, 14/22, 17/22, 20/22];
const GAMEBOARD_COLUMNS = [2/19, 5/19, 8/19, 11/19, 14/19, 17/19];
const GAMEBOARD_CIRCLE_RATIO = 1/22;



export default function Board(props: any){

    const drawArt = (context: CanvasRenderingContext2D) => {
        context.fillStyle = 'blue';
        context.fillRect(0 ,0 , props.width , props.height);
        for(let column = 0; column < GAMEBOARD_COLUMNS.length; column++){
            for(let row = 0; row < GAMEBOARD_ROWS.length; row++){
                let color = 'white';
                if(props.array && props.array[column][row] === 1) color = 'red';
                if(props.array && props.array[column][row] === 2) color = 'yellow';
                drawCircle({x:GAMEBOARD_ROWS[row]*props.width, y: GAMEBOARD_COLUMNS[column]*props.height, radius: props.width*GAMEBOARD_CIRCLE_RATIO, context: context, color: color});
            }
        }
    }
    
    return <Canvas clicked={props.onClick} width={props.width} height={props.height} draw={drawArt}/>;
}
const degreesToRadians = (deg: number) => (deg * Math.PI)/180;

interface DrawCircleArgs {
    x: number;
    y:number;
    radius: number;
    context: CanvasRenderingContext2D;
    color: string;
}
const drawCircle = ({
    x,
    y,
    radius,
    context,
    color}: DrawCircleArgs) =>{
        context.fillStyle = color;
        context.beginPath();
        context.arc(x,y,radius, degreesToRadians(0), degreesToRadians(360), false);
        context.fill();
    };

/*const onClick = (x:number, y:number) => {

}*/