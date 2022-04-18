import React, {useRef, useState } from 'react';
import Canvas from '../common/canvas';
import '../common/assets/css/game.css'

export default function SimonBoard() {
    
    return (
        
        <>
        <div className="centerWrapper">
            <h3>Simon Games</h3>
        </div>
        <br/>
        <br/>

        <div className='playerSelection'>
            <h3>Your Selection</h3>
        </div>

        <div>
            
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