import React, { useRef, useState} from "react";
import Canvas from "../common/canvas";
import "../common/assets/css/game.css"

export default function Game() {

    return (
        <>
        <div className="centerWrapper">
            <h3>BattleShip</h3>
        </div>

        <br/>
        <br/>
        <div className="centerWrapper">
            <div className="center">
                <div className="centerWrapper">
                    <div className="squaretop"></div>
                    <div className="squaretop"></div>
                    <div className="squaretop"></div>
                    <div className="squaretop"></div>
                    <div className="squaretop"></div>
                    <div className="squaretop"></div>
                    <div className="squaretop"></div>
                </div>
                <div className="centerWrapper">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="centerWrapper">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="centerWrapper">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="centerWrapper">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="centerWrapper">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="centerWrapper">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
            </div>
        </div>

        <br/>
        <br/>
        <div className="dragShipsWrapper">
            <div className="center">
                <h3>Drag and Drop Your Ships</h3>
            </div>
        </div>
        </>
    );

}