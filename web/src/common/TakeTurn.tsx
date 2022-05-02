import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation, useQuery} from '@apollo/client';

export default function takeTurn(turnData:any) {
    const TAKE_TURN=gql`
    mutation($payload: String!) {
        takeTurn(payload: $payload)
    }
    `;
    const [takeTurn, { data, loading, error }] = useMutation(TAKE_TURN);
    const mutationData = {
        variables: {payload:JSON.stringify(turnData)},
      
        update: (proxy:any, mutationReturnData:any)=>{
          console.log(JSON.parse(mutationReturnData.data.takeTurn))
          const returnGameData = JSON.parse(mutationReturnData.data.takeTurn)
          if(returnGameData.turn !=undefined) {
            console.log('take turn mutation result, gameData:', returnGameData)
          }
    
          console.log('no take turn mutation result')
        }
      };
    return null
}