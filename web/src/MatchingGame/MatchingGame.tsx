import Board from "./Board/Board";
import React, { useRef } from "react";
import match from "./Images/match.png"



function Game(props: any) {
    return <div><Board></Board></div>
}

const MatchingGame = {
    game: Game,
    thumbnail: <div>
        <div className="centerWrapper">
            <h3>Matching Game</h3>
        </div>
        <div className="centerWrapper">
            <img src={match} width="80%"></img>
        </div>
    </div>,
    name: 'Matching Game'
}

export default MatchingGame;
