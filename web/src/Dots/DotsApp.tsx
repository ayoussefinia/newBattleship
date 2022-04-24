import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Board from './components/Board/Board';
import TopLayout from './components/TopLayout/TopLayout';
import BottomLayout from './components/BottomLayout/BottomLayout';
import './DotsApp.css';

function DotsGame( props: any) {

    function mutePlayer(t: any){
        console.log("mute opponent emots", t);
    }

    function sendEmot(){
        console.log("send emoji");
    }

    return (
        <div className='game-style'>
            <TopLayout/>
            <Board/>
            <BottomLayout mute={mutePlayer} sendEmot={sendEmot}/>
        </div>
    );
}

function Dots(this: any, exit: any) {
    this.game = <DotsGame exit={exit} />;
    this.thumbnail = 
        <div>
            <h3 style={{marginBottom: '0.2rem'}}>Dots</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={process.env.PUBLIC_URL + '/dots-thumbnail.png'} alt="dots-thumbnail" style={{width: '80%', height: '80%', borderRadius: '20px'}}/>
            </div>
        </div>;
    this.name = 'Dots';
}

export default Dots;