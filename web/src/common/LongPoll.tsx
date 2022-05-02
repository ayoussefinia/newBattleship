import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation, useQuery} from '@apollo/client';
import { AppContext } from "../AppContext";

export default function LongPoll(props: any){
    const context = useContext(AppContext)
    // console.log('app context from long poll: ', context)
    const[longPollState, setLongPollState]=useState(context)
    const GET_GAME_DATA= gql`
    query($payload: String!) {
        getGameData(payload: $payload)
    }
    `
    const TURN_RESULT=gql`
    mutation($payload: String!) {
        turnResult(payload: $payload)
    }
    `;
    
    const uuid=JSON.stringify(props.uuid);
    const [turnResult]=useMutation(TURN_RESULT)
    const { loading, error, data, startPolling, stopPolling} = useQuery(GET_GAME_DATA, {
        variables: { payload: uuid},
        pollInterval: 5000,
        onCompleted: (data) => {
         
            // console.log('long poll on completed called: ', data)
            // if(data!= undefined) {
            //     console.log('long poll Game Data::: ', data.getGameData)
            // }
            // if(error){
            //     console.log('long poll error:: ', error)
            // }
            // if(loading){
            //     console.log('long poll loading:: ', loading)
            // }
 
            
        }
    })

    useEffect(()=>{
        console.log('long poll state use effect called, long poll State:',longPollState)
     
    },[longPollState])

    useEffect(()=>{
        if (data!=undefined && data.getGameData != 'no game found') {
            console.log('long poll called, data: ',JSON.parse(data.getGameData))
            const returnGameData = JSON.parse(data.getGameData);
            const game = {
                gameName:returnGameData.gameName,
                gameId:returnGameData.gameId,
                playerID: uuid,
                opponentID: returnGameData.player1ID == uuid? returnGameData.player2ID : returnGameData.player1ID,
                turn:returnGameData.turn,
                turnCount:returnGameData.turnCount,
                playerTurnData:returnGameData.player1ID == uuid? returnGameData.player1TurnData: returnGameData.player2TurnData,
                opponentTurnData:returnGameData.player1ID == uuid? returnGameData.player2TurnData: returnGameData.player1TurnData,
                playerTurnReceivedByOpponent:returnGameData.player1ID == uuid?returnGameData.player1TurnReceived: returnGameData.player2TurnReceived,
                opponentTurnReceivedByPlayer: returnGameData.player1ID == uuid?returnGameData.player2TurnReceived: returnGameData.player1TurnReceived,
                gameData: returnGameData.gameData,
                gameOver: returnGameData.gameOver
              }
            if(Object.keys(game.opponentTurnData).length > 0 && game.opponentTurnReceivedByPlayer==false)  {
                turnResult({variables:{payload: uuid}})
            }
            setLongPollState(game)
        }
        // setAppContext(data.getGameData)
       
    },[data])
    

    startPolling(5000)
return <AppContext.Provider value={longPollState}></AppContext.Provider>;
}