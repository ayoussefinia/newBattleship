import RPSBoard from "./RPSBoard";
import rpsThumb from "../common/assets/images/rpsThumb.png";
import React, { useEffect, useRef} from "react";



function game( props: any ){
    return <div><RPSBoard></RPSBoard></div>
}

const RockPaperScissor = {
    game: game,
    thumbnail: <div>
        <div className="centerWrapper">
            <h3> Rock, Paper, Scissors</h3>
        </div>
        <div className="centerWrapper">
            <img src = {rpsThumb} width = "75%"></img>
        </div>    
    </div>,
    name:'RockPaperScissor'
}

export default RockPaperScissor;