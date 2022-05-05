import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Square from './Square';
import Line from './Line';
import Dot from './Dot';
import GameControl from './GameControl';
import { Container } from '@mui/material';
import { ReadableByteStreamController } from 'stream/web';

//const controller = new GameControl;
// game board layout/data object initialization
const grid_size = 5; // EDIT TO CHANGE GRID SIZE. In terms of dots, grid_size x grid_size

// define game board layout grid setting from grid size
const size = (grid_size + grid_size - 1) * (grid_size + grid_size - 1); // compute real element cardinality for JSX Element array
const rowOffset = Math.sqrt(size); // used when iterating the game board

// compute the ratio value to use for mui grid
let t = grid_size - 1;
let gridLong = t;
let tmp = t * gridLong;
if(tmp < 12){
    gridLong *= 2;
}

tmp = t * gridLong;
while(tmp >= 12){
    gridLong--;
    tmp = t * gridLong;
}
let gridShort = (12 - tmp) / grid_size;

// Board component
const Board =( props: any )=> {
    const [gameGrid, setGameGrid] = useState( () => initializeBoard() );
    const [gameControl, setGameControl] = useState( () => initializeDataStructure() );
    const [counter, setCounter] = useState(0);

    /************ INITIALIZE BOARD **************************************/
    function initializeBoard(){
        // create board layout
        const grid: JSX.Element[] = [];

        let rowToggle = true; // 'true' -> dot-line row, 'false' -> line-square row
        let lc = 1;
        let boxLabel = 'A';
        for (let i = 1; i < (size+1); i++){
            if (rowToggle) { 
                if (i % 2 === 1) {
                    // the 'xs' value needs to update with the given grid size: TODO
                    grid.push(
                        <Grid key={i} item xs={gridShort} >
                            <Dot></Dot>
                        </Grid>
                    );
                } else { 
                    grid.push(
                        <Grid key={i} item xs={gridLong} >
                            <Line value={lc.toString()} width="100%" height="6px" increment={increment} makeMove={makeMove}></Line>
                        </Grid>
                    );
                    lc++;
                }
            }else{ 
                if (i % 2 === 1) {
                    grid.push(
                        <Grid key={i} item xs={gridLong} >
                            <Square label={boxLabel} width="60px" height="60px"></Square>
                        </Grid>
                    );
                    boxLabel = nextChar(boxLabel);
                } else { 
                    grid.push(
                        <Grid key={i} item xs={gridShort} >
                            <Line value={lc.toString()} width="6px" height="100%" increment={increment} makeMove={makeMove}></Line>
                        </Grid>
                    );
                    lc++;
                }
            }
            if (i % rowOffset === 0) { // detect when building next gameboard row
                rowToggle = !rowToggle;
            }
        }
        return grid;
    }

    function initializeDataStructure(){
        const controller = new GameControl();
        let grid = gameGrid;
        let rowToggle = true;
        let queue: number[] = [];
        let dotCounter = 1;
        let lineCounter = 1;
        let boxLabel = 'A';
        let columnCounter = 0;
        let rowCounter = 1;
        let dotTemp = 0;
        for(let i = 1; i < (size+1); i++){
            // go row by row, alternating row types like above
            let elem = grid[i-1].props.children.type["name"];

            if(rowToggle){ // (dot - line) rows
                if(elem === 'Dot'){
                    if((rowCounter === 1 || rowCounter === rowOffset) && (columnCounter === 0 || columnCounter === (rowOffset-1))){
                        controller.setDot(dotCounter,{ type: 'corner', boxes: []});
                    }else{
                        if((rowCounter === 1 || rowCounter === rowOffset) || (columnCounter === 0 || columnCounter === (rowOffset-1))){
                            controller.setDot(dotCounter, {type: 'border', boxes: []});
                        }else{
                            controller.setDot(dotCounter, {type: 'inner', boxes: []});
                        }
                    }
                    queue.push(dotCounter);
                    dotCounter++;
                }else if(elem === 'Line'){
                    controller.setLine(lineCounter.toString(), { endpoints: [dotCounter-1, dotCounter], active: false});
                    lineCounter++;
                }
            }else{ // (line - box) rows
                if(elem === 'Line'){
                    let top = queue[0];
                    queue.shift();
                    controller.setLine(lineCounter.toString(), { endpoints: [top, top+grid_size], active: false});
                    lineCounter++;
                }else if(elem === 'Square'){
                    //controller.addBox(boxLabel, { sides: [lineCounter-grid_size, lineCounter, lineCounter+grid_size,lineCounter-1], owner: null, status: 0}); // sides: [top, right, bottom, left]
                    let dts = [dotTemp-grid_size, dotTemp-grid_size+1, dotTemp+1, dotTemp];
                    controller.setBox(boxLabel, { vertices: [dts[0],dts[1],dts[2],dts[3]], owner: null, status: 0}); // clockwise dot direction
                    boxLabel = nextChar(boxLabel);
                    dotTemp++;
                }
            }
            columnCounter++;
            if (i % rowOffset === 0) { // detect when building next gameboard row
                rowToggle = !rowToggle;
                columnCounter = 0;
                rowCounter++;
                dotTemp = dotCounter;
            }
        }
        controller.updateDots();
        return controller;
    }

    // helper function - increment char to next ascii value
    function nextChar(c: string) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
    /********************************************************************* */

    function increment() {
        let c = counter+1;
        console.log(c)
        setCounter(c);
    }

    // when player clicks a line, register the move
    function makeMove(line: String) {
        console.log(gameControl);
        gameControl.consumeLine(line);
        //setGameControl(t);
    }

    const BoardStyle = {
        width: "90%", 
        height: "90%",
        background: "rgba(0,0,0,0)"  /*  #DF2E0C   <--Original color     */
    }
    
    const Style = {
        width: "100%", 
        background: "rgba(0,0,0,0)",   /*  #DF2E0C   <--Original color     */
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    useEffect(() => {
        //setGameControl(controller);
        gameControl.printController();
    }, [gameControl]);
    
    return (
        
        <Container maxWidth="lg" sx={Style}>
            <Paper elevation={2} sx={{
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                justifyContent:'center', 
                alignItems: 'center', 
                marginTop: '1rem', 
                background: 'rgba(0,0,0,0)'}}>
                <Grid container style={BoardStyle}>
                    {gameGrid}
                </Grid>
            </Paper>
        </Container>
    )
}
export default Board;


