import { useState, useEffect } from 'react';
import {styles} from '../styles/JavaScriptStyles';
import '../styles/border.css';
import '../styles/game.css';
import { CSSTransition } from 'react-transition-group';
export default function Grid(props:any) {
    const Styles = styles(props.gameState,props.delta);
    let [topPadding, setTopPadding] = useState({})

    useEffect(() => {
        console.log("grid useEffect called", props.gameState.gameStarted)
        if (props.gameState.gameStarted && window.innerWidth <= 586){
            setTopPadding({marginTop: '125px'})
        }
    }, [props.gameState.gameStarted])

    return(
        <div className= {props.gameState.gameStarted? 'gameGridStyles gameGridGameStarted' : 'gameGridStyles '}
        style={topPadding}>
        {props.gameState.turn == true ? 
            props.gameState.opponentGrid.map((row:any, rowIndex:any)=>{return(
                row.map((col:any, colIndex:any)=>{return( <div style={props.gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                                (props.gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                    Styles.hitStyles : Styles.missedStyles):Styles.gridElementStyles}
                                                        className= {props.gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                            (props.gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                'hitAnimation' : 'missedAnimation'): 'nothingClass'}
                                                        // onClick={()=>fireAtOpponent(rowIndex,colIndex)}
                                                        onClick={(e)=>props.fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                                
                                                    ></div>)}) 
                )})
        :
        props.gameState.grid.map((row:any, rowIndex:any)=>{return(
            row.map((col:any, colIndex:any)=>{return( <div style={props.gameState.grid[rowIndex][colIndex].firedAt ==true?
                                                         (props.gameState.grid[rowIndex][colIndex].hit==true?
                                                              Styles.hitStyles :Styles.missedStyles):Styles.gridElementStyles}
                                                //    onClick={()=>fire(rowIndex,colIndex)}
                                                // onClick={(e)=>fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                        
                                              ></div>)}) 
         )})}
        
                                                        
                                                        
        {/* {gameState.grid.map((row, rowIndex)=>{return(
           row.map((col, colIndex)=>{return( <div style={gameState.grid[rowIndex][colIndex].firedAt ==true?
                                                        (gameState.grid[rowIndex][colIndex].hit==true?
                                                             hitStyles : missedStyles):gridElementStyles}
                                                  onClick={()=>fire(rowIndex,colIndex)}
                                                        
                                             ></div>)}) 
        )})} */}
        {/* temproary because uuid issues, remove later*/}
        <CSSTransition in={props.gameState.carrierPlaced} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
                 <div onClick={props.handleGridCarrierClick} style={Styles.gridCarrierStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={props.gameState.battleShipsPlaced} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
            <div onClick={props.handleGridBattleShipClick} style={Styles.gridBattleShipStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={props.gameState.destroyerPlaced} timeout={1000}
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
             <div onClick={props.handleGridDestroyerClick} style={Styles.gridDestroyerStyle}> </div>
            </>
        </CSSTransition>
        {/* uncomment below out when uuid is fixed */}
        {/* <CSSTransition in={gameState.carrierPlaced && gameState.turn != gameState.uuid} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
                 <div onClick={handleGridCarrierClick} style={gridCarrierStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={gameState.battleShipsPlaced && gameState.turn != gameState.uuid} timeout={1000} 
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
            <div onClick={handleGridBattleShipClick} style={gridBattleShipStyle}> </div>
            </>
        </CSSTransition>
        <CSSTransition in={gameState.destroyerPlaced && gameState.turn != gameState.uuid} timeout={1000}
        mountOnEnter={true} unmountOnExit={true} classNames="fade">
            <>
             <div onClick={handleGridDestroyerClick} style={gridDestroyerStyle}> </div>
            </>
        </CSSTransition> */}

        
        
    </div>
    )
}