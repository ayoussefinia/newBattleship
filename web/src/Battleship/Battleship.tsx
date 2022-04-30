import Game from "./Game";
import React, { useRef, useContext} from "react";
import testBattleShip from "../common/assets/images/testBattleShip.jpg"
import { AppContext } from '../AppContext';
import Relay from '../common/Relay';




function game( props: any) {
    // var text = useContext(AppContext);
    //console.log(props['test'])
   
    return <div><Game/></div>
    //return (<AppContext.Consumer>{value => (<Game data={value}></Game>)}</AppContext.Consumer>)
    //return (<AppContext.Consumer><Game></Game></AppContext.Consumer>)



    // var text = useContext(AppContext);
    // // console.log(text)
   
    // return <div><Game text={text}/></div>
} 

const BattleShip = {
    game: game,
    thumbnail: <div>
        <div className="centerWrapper">
            <h3>BattleShip</h3>
        </div>
        <div className="centerWrapper">
            <img src={testBattleShip} width="50%"></img>
        </div>
    </div>,
    name: 'BattleShip'
}

export default BattleShip;