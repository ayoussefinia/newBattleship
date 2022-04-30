import React, { useRef, useState, useContext} from "react";
import Canvas from "../common/canvas";
import "../common/assets/css/game.css";
import { AppContext } from '../AppContext'
import PlayerDiv from "../Dots/components/TopLayout/PlayerDiv";


export default function Game(props: any) {

    console.log('a;lskdjf;alskfjs;dlk',props.text);

    return (
    <div>
        <AppContext.Consumer>{value=><div>{value.playerID}</div>}</AppContext.Consumer>
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
    </div>
      
        
    );

}