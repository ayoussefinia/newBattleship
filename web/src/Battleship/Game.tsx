import React, { useRef, useState, useContext} from "react";
import Canvas from "../common/canvas";
import "../common/assets/css/game.css";
import { AppContext } from '../AppContext'
import PlayerDiv from "../Dots/components/TopLayout/PlayerDiv";
import LongPoll from "../common/LongPoll";
import { gql, useMutation, useQuery} from '@apollo/client';

export default function Game(props: any) {
    const TAKE_TURN=gql`
    mutation($payload: String!) {
        takeTurn(payload: $payload)
    }
    `;



    const mutationVars= {
        uuid:JSON.stringify(localStorage.getItem("uuid")),
        turnData: {row: 0, col: 0}
    }

    const [takeTurn, { data, loading, error }] = useMutation(TAKE_TURN);
   
    const mutationData = {
        variables: {payload:JSON.stringify(mutationVars)},
      
        update: (proxy:any, mutationReturnData:any)=>{
        
          console.log('take turn result',mutationReturnData.data.takeTurn)
        //   const returnGameData = JSON.parse(mutationReturnData.data.takeTurn)
        //   if(returnGameData.turn !=null) {
        //     console.log('take turn mutation result, gameData:', returnGameData)
        //   }
    
          console.log('no take turn mutation result')
        }
      };

   
    console.log('app context',useContext(AppContext))
    return (
    <div onClick={()=>{takeTurn(mutationData)}}>
        <LongPoll uuid={localStorage.getItem("uuid")}/>

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