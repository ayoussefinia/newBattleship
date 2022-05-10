import React from 'react'
import '../styles/border.css';
import '../styles/game.css';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import checkConflicts from '../utility/checkConflicts';
import {moveShipUp} from '../utility/moveShip';
import {moveShipLeft} from '../utility/moveShip';
import {moveShipRight} from '../utility/moveShip';
import {moveShipDown} from '../utility/moveShip';
import rotateShip from '../utility/rotateShip';
import { faArrowUp, faArrowLeft, faArrowRight, faArrowDown, faRotateLeft, faRotateRight, faCircleXmark, faShip, faBookSkull, faRocket } from '@fortawesome/free-solid-svg-icons'
// import {styles} from '../styles/JavaScriptStyles';
export default function ShipControl(props: any) {
    return(
        <div style={{ backgroundColor: 'white', borderRadius: '20px', width: '97%', margin: '0% 1.5% 0% 1.5%' }}>
        <div className='centerWrapper'>
            <div className='center' style={{width: "80%"}}>
                <div className="shipSelection">
                <div className="centerWrapper">
                    <div className="center" style={{fontSize:'20px'}}>Select Ship</div>
                </div>
                <br />
                <div className="centerWrapper">
                    <div className="center">
                    <div
                        className="defaultWrapper"
                        onClick={props.handleCarrierClick}
                    >
                        <div className={`${props.selectCarrierStyle}`}></div>
                        <div className={`${props.selectCarrierStyle}`}></div>
                        <div className={`${props.selectCarrierStyle}`}></div>
                        <div className={`${props.selectCarrierStyle}`}></div>
                        <div className={`${props.selectCarrierStyle}`}></div>                            
                    </div>
                    </div>
                </div>
                <br />
                <div className="centerWrapper">
                    <div className="center">
                    <div
                        className="defaultWrapper"
                        onClick={props.handleBattleShipClick}
                    >
                        <div className={`${props.selectBattleshipStyle}`}></div>
                        <div className={`${props.selectBattleshipStyle}`}></div>
                        <div className={`${props.selectBattleshipStyle}`}></div>
                        <div className={`${props.selectBattleshipStyle}`}></div>
                    </div>
                    </div>
                </div>
                <br />
                <div className="centerWrapper">
                    <div className="center">
                    <div
                        className="defaultWrapper"
                        onClick={props.handleDestroyerClick}
                    >
                        <div className={`${props.selectDestroyerStyle}`}></div>
                        <div className={`${props.selectDestroyerStyle}`}></div>
                    </div>
                    </div>
                    
                </div>
                <br />
                </div>
    
            </div>
            <div className='center' style={{width: "40%"}}>
                <div className='buttonPanelContainer'> 
                <CSSTransition in={props.gameState.battleShipsPlaced || props.gameState.carrierPlaced || props.gameState.destroyerPlaced} timeout={1000} 
                    mountOnEnter={true} unmountOnExit={true} classNames="fade">
                        <>
                        <div className='manipulateShipPanel'>
                            <div className='manipulateTitle noSelect'>Position Ship</div>
                            <div className='arrowUpContainer'>
                                <FontAwesomeIcon  icon={faArrowUp} 
                                                className='arrowStyles'
                                                onClick={()=>moveShipUp(checkConflicts, props.setGameState, props.gameState)}
                                                />
                            </div>
                            <div className='leftAndRightContainer'>
                                <div className='arrowLeftContainer'>
                                    <FontAwesomeIcon className='arrowStyles' 
                                                    icon={faArrowLeft} 
                                                    onClick={()=>moveShipLeft(checkConflicts, props.setGameState, props.gameState)}
                                                    />
                                </div>
                                <div className='arrowRightContainer'>
                                    <FontAwesomeIcon icon={faArrowRight}
                                                    className='arrowStyles' 
                                                    onClick={()=>moveShipRight(checkConflicts, props.setGameState, props.gameState)}
                                                    />
                                </div>
                            </div>
                            <div className='arrowDownContainer'>
                                <FontAwesomeIcon icon={faArrowDown} 
                                                className='arrowStyles'
                                                onClick={()=>moveShipDown(checkConflicts,props.setGameState, props.gameState)}
                                                />
                                </div>
                            <div className='rotateLeftAndRightContainer'>
                                <div className='rotateLeftContainer'>
                                    <FontAwesomeIcon icon={faRotateLeft} 
                                                    className='arrowStyles' 
                                                    onClick={()=>rotateShip(props.gameState,checkConflicts,props.setGameState,props.numGridEdge)}
                                                    />
                                </div>
                            </div>
                        </div> 
                        </>
                    </CSSTransition>
                    
                    
                    
                </div>
            </div>
        </div>
        <div className='centerWrapper'>
        <CSSTransition in={props.gameState.battleShipsPlaced && props.gameState.carrierPlaced && props.gameState.destroyerPlaced} 
                    timeout={1000}  mountOnEnter={true} unmountOnExit={true} classNames="fade">
                    <>
                        <br/>
                        <div className='startGameBtn' onClick={props.startGame}>Start Game</div>
                        <br/>                           
                    </>
        </CSSTransition>
        </div>
    </div>
    )
} 