import Game from "./Game";
import React, { useRef} from "react";
import testBattleShip from "../common/assets/images/testBattleShip.jpg"



function game( props: any) {
    return <div><Game></Game></div>
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