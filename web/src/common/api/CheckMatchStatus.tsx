import React,  {useEffect} from 'react';
import { gql, useMutation, useQuery} from '@apollo/client';
import GameInput from '../GameInput';

export default function checkMatchStatus(props: any) { // the endpoint we will be polling for?
    const START_GAME = gql`
        mutation StartGame($game: GameInput!) {
            startGame(game: $game)
        }
    `;

    const [startGame, { data, loading, error }] = useMutation(START_GAME, {
        variables: {
          game: {} as GameInput
        }
    });

    useEffect(()=>{
        startGame({ variables: { game: props.gameObj as GameInput}});
        console.log(props.gameObj);
    },[]);

    useEffect(() =>{
        if(data) console.log(data);
    }, [data]);

    if (loading) console.log(loading);
    if (error)  console.log(error);

    return <div></div>
}
