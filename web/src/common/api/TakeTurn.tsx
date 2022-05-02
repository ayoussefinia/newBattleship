import React,  {useEffect} from 'react';
import { gql, useMutation, useQuery} from '@apollo/client';
import GameInput from '../GameInput';

export default function TakeTurn(props: any) {
    const TAKE_TURN = gql`
        mutation TakeTurn($game: GameInput!) {
            takeTurn(game: $game)
        }
    `;

    const [takeTurn, { data, loading, error }] = useMutation(TAKE_TURN, {
        variables: {
          game: {} as GameInput
        }
    });

    useEffect(()=>{
        takeTurn({ variables: { game: props.gameObj as GameInput}});
        console.log("taking a turn: ", props.gameObj);
    },[]);

    useEffect(() =>{
        if(data) console.log(data);
    }, [data]);

    if (loading) console.log(loading);
    if (error)  console.log(error);

    return <div></div>
}