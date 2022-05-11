import React, {useRef, useEffect, useState, MouseEvent} from 'react';
import  _ from 'lodash'
import { CSSTransition } from 'react-transition-group';
import handleShipPlacement from './utility/handleShipPlacement';
import placeShip from './utility/placeShip';
import './styles/border.css'
import './styles/game.css';
import {styles} from './styles/JavaScriptStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShipControl from './Components/ShipControl';
import MiniGrid from './Components/MiniGrid';
import TopSection from './Components/TopSection';
import Grid from './Components/Grid';
import {ProgressBar} from 'react-bootstrap';
import { isAbsolute } from 'path';
import { Rocket } from '@mui/icons-material';

export default  function BattleShip() {
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [gameState, setGameState] = useState({
                                    grid: [
                                        [{row:0,column:0,hit:false,firedAt:false}]
                                    ],
                                    opponentGrid: [
                                        [{row:0,column:0,hit:false,firedAt:false}]
                                    ],
                                    battleShip: [
                                                 {hit:false, pos:{x:0, y:0}},
                                                 {hit:false, pos:{x:0, y:0}},
                                                 {hit:false, pos:{x:0, y:0}},
                                                 {hit:false, pos:{x:0, y:0}}
                                                ],
                                    carrier :   [
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}}
                                                ],
                                    destroyer:  [
                                                {hit:false, pos:{x:0, y:0}},
                                                {hit:false, pos:{x:0, y:0}},
                                    ],
                                    gameGrid:[[]],
                                    battleShipsPlaced: false,
                                    carrierPlaced: false,
                                    destroyerPlaced: false, 
                                    placingBattleShip: false,
                                    placingCarrier: false,
                                    placingDestroyer: false,
                                    manipulatingBattleShip: false,
                                    battleShipVertical: false,
                                    carrierVertical: false,
                                    destroyerVertical:false,
                                    gameStarted: false,
                                    gameStartedBackend: false,
                                    uuid: '' ,
                                    gameId: '',
                                    turn: true,
                                    opponentShotHit:false,
                                    energyLevel: 100,
                                    opponentEnergyLevel: 100
                                    });
    let [selectedShip, setSelectedShip] = useState("");
    let [isSmallScreen, setIsSmallScreen] = useState(false)
    // const POST_GAME_ARRAY = gql`
     useEffect(()=>{
        //  change background only when battleship is being played
        if (isInitialRender){
            setIsInitialRender(false)
            document.body.style.backgroundImage = 'linear-gradient(#74acd6, #0c3c7c)';
            if (document.body.clientHeight <= 675 || document.body.clientWidth <= 360){
                setIsSmallScreen(true)
            }
        }

        let gameGrid = Array(numGridEdge).fill(null).map(row => new Array(numGridEdge).fill(null))
        for(var i =0; i<numGridEdge;i++){
            for(var j=0; j<numGridEdge; j++){
                let  obj={column:0, row:0, hit:false, firedAt:false}
                obj.row = i;
                obj.column=j
                gameGrid[i][j] = obj
            }
        }

        setGameState({...gameState, grid: gameGrid, opponentGrid: gameGrid});

    },[])


//GLOBALS
    const numGridEdge =8;
    const gridEdgeLength= 336;
    const delta = (gridEdgeLength)/numGridEdge;


    let [selectCarrierStyle, setSelectCarrierStyle] = useState('shipDefaultStyle')
    let [selectBattleshipStyle, setSelectBattleshipStyle] = useState('shipDefaultStyle')
    let [selectDestroyerStyle, setSelectDestroyerStyle] = useState('shipDefaultStyle')

    function handleBattleShipClick() {
        setGameState({...gameState, placingBattleShip:true, placingCarrier:false});
        highlightBattleship()
    }
    function handleDestroyerClick () {
        setGameState({...gameState, placingDestroyer:true, placingBattleShip:false, placingCarrier:false});
        highlightDestroyer()
    }
    function handleCarrierClick (){
        setGameState({...gameState, placingCarrier:true, placingBattleShip:false});
        highlightCarrier()
    }
    function handleGridCarrierClick () {
        setGameState({...gameState, placingBattleShip:false, placingCarrier:true, placingDestroyer:false});
        highlightCarrier()
    }
    function handleGridBattleShipClick () {
        setGameState({...gameState, placingBattleShip:true, placingCarrier:false, placingDestroyer:false});
        highlightBattleship()
    }
    function handleGridDestroyerClick () {
        setGameState({...gameState, placingDestroyer:true, placingCarrier:false, placingBattleShip:false});
        highlightDestroyer()
    }

    function highlightCarrier(){
        setSelectedShip("carrier")
        setSelectCarrierStyle('shipSelectedStyle')
        setSelectBattleshipStyle('shipDefaultStyle')
        setSelectDestroyerStyle('shipDefaultStyle')
        setShipSelectShadow(false)
    }
    function highlightDestroyer(){
        setSelectedShip("destroyer")
        setSelectCarrierStyle('shipDefaultStyle')
        setSelectBattleshipStyle('shipDefaultStyle')
        setSelectDestroyerStyle('shipSelectedStyle')
        setShipSelectShadow(false)
    }
    function highlightBattleship(){
        setSelectedShip("battleship")
        setSelectCarrierStyle('shipDefaultStyle')
        setSelectBattleshipStyle('shipSelectedStyle')
        setSelectDestroyerStyle('shipDefaultStyle')
        setShipSelectShadow(false)
    }

    const Styles = styles(gameState,delta);

    function setManipulateTrue() {
        setGameState({...gameState, manipulatingBattleShip: true});
    }

    function startGame() {
        setGameState({...gameState, gameStarted: true})
    }

    function fire(row:any, col:any) {
        let opponentShotHit= false;
        console.log('fired')
        const newGrid = gameState.grid;
        let newObj = {row:row, column:col, firedAt:true, hit: false}
        if(gameState.gameStarted) {
            for(var i=0; i<gameState.battleShip.length; i++) {
                if (gameState.battleShip[i].pos.x == col && gameState.battleShip[i].pos.y==row) {
                    newObj.hit =true;
                    opponentShotHit=true;
                }
            }
            for(var i=0; i<gameState.carrier.length; i++) {
                if (gameState.carrier[i].pos.x == col && gameState.carrier[i].pos.y==row) {
                    newObj.hit =true;
                    opponentShotHit=true;
                }
            }
            for(var i=0; i<gameState.destroyer.length; i++) {
                if (gameState.destroyer[i].pos.x == col && gameState.destroyer[i].pos.y==row) {
                    newObj.hit =true;
                    opponentShotHit=true;
                }
            }
            newGrid[row][col]= newObj;
            console.log(newGrid)
        }
        setGameState({...gameState, grid: newGrid, opponentShotHit: opponentShotHit})
        const newEnergyLevel = opponentShotHit? gameState.energyLevel-9.0909: gameState.energyLevel;
        setTimeout(()=>{setGameState({...gameState, turn: !gameState.turn, energyLevel: newEnergyLevel})}, 2000)
    }

    function fireAtOpponent(row:any, col:any) {
        console.log('fire at opponent called')
        const fireCoordinate ={
            row: row,
            column: col,
            gameId: gameState.gameId,
            // uuid: gameState.uuid
        }
    }

    function fireOrPlace(e: any, rowIndex:any, colIndex:any, player:string){
        let shipPlaced = false
        switch(selectedShip){
            case 'battleship': shipPlaced = gameState.battleShipsPlaced
                break;
            case 'carrier': shipPlaced = gameState.carrierPlaced
                break;
            case 'destroyer': shipPlaced = gameState.destroyerPlaced
                break;
        }
        if (shipPlaced){
            player == "fireAtOpponent" ? fireAtOpponent(rowIndex,colIndex) : fire(rowIndex,colIndex)
        } else if (gameState.gameStarted && shipPlaced) {
            player ==  "fire" ? fire(rowIndex,colIndex) : console.log();
        }
        
        else{
            handleShipPlacement(selectedShip, rowIndex, colIndex, gameState,setGameState,placeShip) 
        }
        
    }
    
    // shadow for shipSelection and board depending on if the user has selected a ship or placed a ship
    let [shipSelectShadow, setShipSelectShadow] = useState(true)
    const highlightArea = { boxShadow: '0 0 0 5000px rgb(0 0 0 / 60%)', zIndex: '10',
                            borderRadius: '150px', transition: 'all 0.4s ease', paddingTop: ''}
    const emptyHighlightArea = { boxShadow: '', zIndex: '', borderRadius: '', transition: 'all 0.4s ease', paddingTop: ''}
    let [selectionStyle, setSelectionStyle] = useState(highlightArea)
    let [boardStyle, setBoardStyle] = useState(emptyHighlightArea)
    let [firstShipPlaced, setFirstShipPlaced] = useState(false)
    let [boardText, setBoardText] = useState("")

    // once ship is selected
    useEffect(() => {
        if (!shipSelectShadow){
            setSelectionStyle(emptyHighlightArea)

            setBoardStyle({boxShadow: '0 0 0 5000px rgb(0 0 0 / 60%)', zIndex: '10',
            borderRadius: '', transition: 'all 0.4s ease', paddingTop: '20px'})
            setBoardText('Place ship here')
        }
    }, [shipSelectShadow])
    
    // once ship is placed
    useEffect(() => {
        if (!firstShipPlaced){
            if(gameState.battleShipsPlaced || gameState.carrierPlaced || gameState.destroyerPlaced){
                setFirstShipPlaced(true)
                setBoardStyle(emptyHighlightArea)
                setBoardText('')
            }
        }
    }, [gameState])

function clicked() {
    console.log('gameState.gameId', gameState.gameId);
    console.log('gameState.turn', gameState.turn)
}

    return(
        <div  className="noSelect gameBody">
            <TopSection
                gameState={gameState}
            />
            {/* {gameStaste.gameStarted ? <GameStartedMessage uuid={gameState.uuid}/> : <div/>} */}
            <div className='centerWrapper'>
                <div className='center'>
                        <br/>
                </div>
            </div>
            <br/>
            <div className='centerWrapper'>
                <div className='center highlightBoard' style={boardStyle} display-content={boardText} >
                    <Grid
                        gameState={gameState}
                        delta={delta}
                        fireOrPlace={fireOrPlace}
                        handleGridCarrierClick={handleGridCarrierClick}
                        handleGridBattleShipClick={handleGridBattleShipClick}
                        handleGridDestroyerClick={handleGridDestroyerClick}
                    />
                </div>
            </div>
            <MiniGrid
                gameState={gameState}
                delta={delta}
                fireOrPlace={fireOrPlace}
            />
            <br/>
            <CSSTransition in={!gameState.gameStarted} timeout={1000}
                        mountOnEnter={true} unmountOnExit={true} classNames="fade">
                <>
                    <ShipControl
                        handleCarrierClick={handleCarrierClick}
                        handleBattleShipClick={handleBattleShipClick}
                        handleDestroyerClick={handleDestroyerClick}
                        selectCarrierStyle={selectCarrierStyle}
                        selectBattleshipStyle={selectBattleshipStyle}
                        selectDestroyerStyle={selectDestroyerStyle}
                        gameState={gameState}
                        setGameState={setGameState}
                        numGridEdge={numGridEdge}
                        startGame={startGame}
                        isSmallScreen={isSmallScreen}
                        firstShipPlaced={firstShipPlaced}
                        selectionStyle={selectionStyle}
                        boardStyle={boardStyle}
                        boardText={boardText}
                    />                                                          
                </>
            </CSSTransition>
        </div>
    );
    
}