import Game from "./Game";
import React, { useRef} from "react";
import battleshipLogo from "../common/assets/images/battleshipLogo.png"



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
            <img src={battleshipLogo} width="215px"></img>
        </div>
    </div>,
    name: 'BattleShip'
}

export default BattleShip;