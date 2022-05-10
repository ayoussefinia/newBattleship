import React, {useRef, useEffect, useState, MouseEvent} from 'react';
import battleshipImage from './battleship.svg';
import carrierImage from './carrier.svg';
import destroyerImage from './destroyer.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  _ from 'lodash'
import { faArrowUp, faArrowLeft, faArrowRight, faArrowDown, faRotateLeft, faRotateRight, faCircleXmark, faShip, faBookSkull, faRocket } from '@fortawesome/free-solid-svg-icons'
import { gql, useMutation, useQuery } from '@apollo/client';
import { CSSTransition } from 'react-transition-group';
import checkConflicts from './utility/checkConflicts';
import {moveShipUp} from './utility/moveShip';
import {moveShipLeft} from './utility/moveShip'
import {moveShipRight} from './utility/moveShip'
import {moveShipDown} from './utility/moveShip'
import rotateShip from './utility/rotateShip'
import handleShipPlacement from './utility/handleShipPlacement';
import placeShip from './utility/placeShip';
import './styles/border.css'
import './styles/game.css';
import {styles} from './styles/JavaScriptStyles';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProgressBar} from 'react-bootstrap';
import { isAbsolute } from 'path';
import { Rocket } from '@mui/icons-material';
import StartGameBtn from './startGameBtn'

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


        // if(!localStorage.getItem("uuid")) {
        //     const uuid = uuidv4();
        //     localStorage.setItem("uuid", uuid)
        // }

        // const uuid = JSON.stringify(localStorage.getItem("uuid"))

        setGameState({...gameState, grid: gameGrid, opponentGrid: gameGrid});
        // postGameArray({ variables: { payload: 'hello'} });
        // postGameArray({ variables: { payload: 'hello'} });
    //    MyComponent();
        

    },[])



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


   

    async function startGame() {
        const element = {
            row: 0,
            column:0,
            hit: true,
            firedAt: true
        }
        let obj2 = {data: [{}]}
        for(var i=0; i<numGridEdge; i++) {
            let obj1 ={data: [{}]};
            obj1.data = gameState.grid[i]
            obj2.data.push(obj1) ;
        }
        obj2.data.shift();

        let postObject = {
            grid: obj2,
            uuid: gameState.uuid,
            gameId: gameState.gameId
        }
        console.log('post object', postObject)
        // consol.log(obj2)
        // const arr2 =[arr1]
        // const uuid = uuidv4();
        // console.log('uuid:', JSON.stringify(uuid))
        // postUUID({variables: {payload: uuid}});
        // }

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
            player ==  "fire" ? fire(rowIndex,colIndex) : null;
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

        <div  onClick={clicked} className="noSelect gameBody">
            <div style={gameState.gameStarted? Styles.statsSection : Styles.displayNoneStyles}>
                <div style={Styles.vs}>Vs.</div>
                <div style={Styles.powerLevelsContainer}>
                    <div style={Styles.progressLeft}> <ProgressBar style={Styles.progressBarStyle} 
                                                            striped 
                                                            variant={gameState.energyLevel < 30? 'danger' : 'info'}
                                                            animated 
                                                            now={gameState.energyLevel} />
                    </div>
                    <div style={Styles.progressRight}> <ProgressBar style={Styles.progressBarStyle} 
                                                             striped 
                                                             variant={gameState.energyLevel < 30? 'danger' : 'info'}
                                                             animated 
                                                             now={gameState.energyLevel} />
                    </div>
                </div>
                <div style={Styles.statsLeft}>
                    <div style={Styles.playerTitle}>Player</div>
                    <FontAwesomeIcon  
                                icon={faShip} 
                                className='shipStyles'
                             
                                size='4x'
                                />
                    {gameState.turn == true ? 
                                <FontAwesomeIcon  
                                    icon={faRocket} 
                                    className='rocketStyles'
                                    size='2x'
                                /> : null}
                    
                </div>
                <div style={Styles.statsRight}>
                    <div style={Styles.opponentTitle}>Opponent</div>
                    <FontAwesomeIcon  icon={faBookSkull} 
                                className='skullStyles'
                        
                                size='4x'
                                />
                    {gameState.turn != true ? 
                                <FontAwesomeIcon  
                                    icon={faRocket} 
                                    className='opponentRocketStyles'
                                    size='2x'
                                /> : null}
                </div>
     

            </div>
            {/* {gameStaste.gameStarted ? <GameStartedMessage uuid={gameState.uuid}/> : <div/>} */}
            <div className='centerWrapper'>
                <div
                    className='center'
                    >
                        <br/>
                    {/* <GameStartedMessage uuid={gameState.uuid}
                                setGameState={(gameId:any, turn:any)=> {
                                setGameState({...gameState, turn:turn, gameId:gameId, gameStartedBackend:true})}}  />
                        
                    <ActiveGameMessage gameState={gameState}
                                fire={(row:any,col:any)=>fire(row,col)}/> */}
                </div>
            </div>
            <br/>
            <div className='centerWrapper'>
               
                <div className='center highlightBoard' style={boardStyle} display-content={boardText} >
                    <div className= {gameState.gameStarted? 'gameGridStyles gameGridGameStarted' : 'gameGridStyles '}>
                        {gameState.turn == true ? 
                            gameState.opponentGrid.map((row, rowIndex)=>{return(
                                row.map((col, colIndex)=>{return( <div style={gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                                                (gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                                    Styles.hitStyles : Styles.missedStyles):Styles.gridElementStyles}
                                                                        className= {gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                                            (gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                                'hitAnimation' : 'missedAnimation'): 'nothingClass'}
                                                                        // onClick={()=>fireAtOpponent(rowIndex,colIndex)}
                                                                        onClick={(e)=>fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                                                
                                                                    ></div>)}) 
                                )})
                        :
                        gameState.grid.map((row, rowIndex)=>{return(
                            row.map((col, colIndex)=>{return( <div style={gameState.grid[rowIndex][colIndex].firedAt ==true?
                                                                         (gameState.grid[rowIndex][colIndex].hit==true?
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
                        <CSSTransition in={gameState.carrierPlaced} timeout={1000} 
                        mountOnEnter={true} unmountOnExit={true} classNames="fade">
                            <>
                                 <div onClick={handleGridCarrierClick} style={Styles.gridCarrierStyle}> </div>
                            </>
                        </CSSTransition>
                        <CSSTransition in={gameState.battleShipsPlaced} timeout={1000} 
                        mountOnEnter={true} unmountOnExit={true} classNames="fade">
                            <>
                            <div onClick={handleGridBattleShipClick} style={Styles.gridBattleShipStyle}> </div>
                            </>
                        </CSSTransition>
                        <CSSTransition in={gameState.destroyerPlaced} timeout={1000}
                        mountOnEnter={true} unmountOnExit={true} classNames="fade">
                            <>
                             <div onClick={handleGridDestroyerClick} style={Styles.gridDestroyerStyle}> </div>
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

                   
                </div>
            </div>
            <div style={gameState.gameStarted? Styles.miniGridStyles : Styles.displayNoneStyles }>
                 {gameState.turn != true ? 
                            gameState.opponentGrid.map((row, rowIndex)=>{return(
                                row.map((col, colIndex)=>{return( <div style={gameState.opponentGrid[rowIndex][colIndex].firedAt ==true?
                                                                                (gameState.opponentGrid[rowIndex][colIndex].hit==true?
                                                                                    Styles.hitStyles : Styles.missedStyles):Styles.gridElementStyles}
                                                                        // onClick={()=>fireAtOpponent(rowIndex,colIndex)}
                                                                        onClick={(e)=>fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                                                
                                                                    ></div>)}) 
                                )})
                        :
                        gameState.grid.map((row, rowIndex)=>{return(
                            row.map((col, colIndex)=>{return( <div style={gameState.grid[rowIndex][colIndex].firedAt ==true?
                                                                         (gameState.grid[rowIndex][colIndex].hit==true?
                                                                              Styles.hitStyles :Styles.missedStyles):Styles.gridElementStyles}
                                                                //    onClick={()=>fire(rowIndex,colIndex)}
                                                                // onClick={(e)=>fireOrPlace(e, rowIndex,colIndex, "fire")}
                                                                        
                                                              ></div>)}) 
                         )})}
                     
                            <div  style={Styles.miniGridCarrierStyle}> </div>
                            <div style={Styles.miniGridBattleShipStyle}> </div>
                            <div style={Styles.miniGridDestroyerStyle}> </div>
                   
            </div>
            <br/>
            <CSSTransition in={!gameState.gameStarted} timeout={1000}
                        mountOnEnter={true} unmountOnExit={true} classNames="fade">
                <>
                    <div className='bottomDiv' 
                    style={{ backgroundColor: 'white', borderRadius: '20px', width: '97%', margin: '0% 1.5% 0% 1.5%' }}>
                        {isSmallScreen ?
                            <StartGameBtn gameState={gameState} startGame={startGame}></StartGameBtn>: null}
                        <div className='centerWrapper'>
                            <div className='center' style={{width: "80%"}}>
                                <div className="shipSelection" style={selectionStyle}>
                                    <div className="centerWrapper">
                                        <div className="center" style={{fontSize:'20px'}}>Select a Ship</div>
                                    </div>
                                    <div className="centerWrapper">
                                        <div className="center">
                                        <div
                                            className="defaultWrapper"
                                            onClick={handleCarrierClick}
                                        >
                                            <div className={`${selectCarrierStyle}`}></div>
                                            <div className={`${selectCarrierStyle}`}></div>
                                            <div className={`${selectCarrierStyle}`}></div>
                                            <div className={`${selectCarrierStyle}`}></div>
                                            <div className={`${selectCarrierStyle}`}></div>                            
                                        </div>
                                        </div>
                                    </div>
                                    <div className="centerWrapper">
                                        <div className="center">
                                        <div
                                            className="defaultWrapper"
                                            onClick={handleBattleShipClick}
                                        >
                                            <div className={`${selectBattleshipStyle}`}></div>
                                            <div className={`${selectBattleshipStyle}`}></div>
                                            <div className={`${selectBattleshipStyle}`}></div>
                                            <div className={`${selectBattleshipStyle}`}></div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="centerWrapper">
                                        <div className="center">
                                        <div
                                            className="defaultWrapper"
                                            onClick={handleDestroyerClick}
                                        >
                                            <div className={`${selectDestroyerStyle}`}></div>
                                            <div className={`${selectDestroyerStyle}`}></div>
                                        </div>
                                        </div>
                                        
                                    </div>
                                {/* <br /> */}
                                </div>
                    
                            </div>
                            <div className='center' style={{width: "40%"}}>
                                <div className='buttonPanelContainer'> 
                                <CSSTransition in={firstShipPlaced} timeout={1000} 
                                    mountOnEnter={true} unmountOnExit={true} classNames="fade">
                                        <>
                                        <div className='manipulateShipPanel'>
                                            <div className='manipulateTitle noSelect'>Position Ship</div>
                                            <div className='arrowUpContainer'>
                                                <FontAwesomeIcon  icon={faArrowUp} 
                                                                className='arrowStyles'
                                                                onClick={()=>moveShipUp(checkConflicts,setGameState, gameState)}
                                                                />
                                            </div>
                                            <div className='leftAndRightContainer'>
                                                <div className='arrowLeftContainer'>
                                                    <FontAwesomeIcon className='arrowStyles' 
                                                                    icon={faArrowLeft} 
                                                                    onClick={()=>moveShipLeft(checkConflicts,setGameState, gameState)}
                                                                    />
                                                </div>
                                                <div className='arrowRightContainer'>
                                                    <FontAwesomeIcon icon={faArrowRight}
                                                                    className='arrowStyles' 
                                                                    onClick={()=>moveShipRight(checkConflicts,setGameState, gameState)}
                                                                    />
                                                </div>
                                            </div>
                                            <div className='arrowDownContainer'>
                                                <FontAwesomeIcon icon={faArrowDown} 
                                                                className='arrowStyles'
                                                                onClick={()=>moveShipDown
                                                                    (checkConflicts,setGameState, gameState)}
                                                                />
                                                </div>
                                            <div className='rotateLeftAndRightContainer'>
                                                <div className='rotateLeftContainer'>
                                                    <FontAwesomeIcon icon={faRotateLeft} 
                                                                    className='arrowStyles' 
                                                                    onClick={()=>rotateShip(gameState,checkConflicts,setGameState,numGridEdge)}
                                                                    />
                                                </div>
                                            </div>
                                        </div> 
                                        </>
                                    </CSSTransition>
                                    
                                    
                                </div>
                            </div>
                            
                        </div>
                        {!isSmallScreen ?
                            <StartGameBtn gameState={gameState} startGame={startGame}></StartGameBtn>: null}
                    </div>
                </>
            </CSSTransition>
            
        </div>
    );
    
}