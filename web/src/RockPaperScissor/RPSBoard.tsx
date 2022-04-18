import React, {useRef, useState } from 'react';
import Canvas from '../common/canvas';
import '../common/assets/css/game.css'

export default function RPSBoard() {
    
    return (
        
        <>
        <div className="centerWrapper">
            <h3>Rock Paper Scissors</h3>
        </div>
        <br/>
        <br/>

        <div className='playerSelection'>
            <h3>Your Selection</h3>
        </div>

        <div>
            <img src="https://i.imgur.com/TONXH9s.png" 
            width="15%"
            alt="" />
            <img src="https://i.imgur.com/t2154qR.png" 
            width="15%"
            alt="" />
            <img src="https://i.imgur.com/SXstPKk.png" 
            width="15%"
            alt="" />
        </div>

        <div>
            <div className="playerSelection">
                <h3>Opponent Selection</h3>
            </div>   
        </div>

        <div className='opponentSelection'>

        </div>

        
        </>
    );

}