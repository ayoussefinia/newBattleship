import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Board from './components/Board/Board';
import TopLayout from './components/TopLayout/TopLayout';
import BottomLayout from './components/BottomLayout/BottomLayout';
import './DotsApp.css';

function DotsGame( props: any) { 
    const [playerEmoji, setPlayerEmoji] = useState("");
    const [playerIcon, setPlayerIcon] = useState(1);
    const [playerColor, setPlayerColor] = useState("#FFFF6D");
    const [opponentEmoji, setOpponentEmoji] = useState("");
    const [opponentIcon, setOpponentIcon] = useState(5);
    const [opponentColor, setOpponentColor] = useState("#12CDD4")
    const [mute, setMute] = useState(false);

    // trigger the API mutation to start game
    function starting(){
        //setStart(true);
        props.start(true);
        let g = { // your GameInput object to pass to 'startGame' mutation
            playerId: 'wwwwwww',
            opponentId: 'zzzzzzz',
            data: 'dssdassd'
        }
        props.gameObject(g);
    }





    function mutePlayer(){
        console.log("mute opponent emots");
        let m = mute;
        setMute(!m);
        //setOpponentEmoji("");
    }

    function sendEmoji(emot: string){
        console.log("send emoji");
        setPlayerEmoji(emot);

        // TODO: emit emoji to opponent 
        //

    }

    // TODO: set the opponontEmoji state when emoji message received from opponent
    
    return (    
        <Container maxWidth='sm' sx={{
            display: 'grid',
            gridTemplateColumns: "auto",
            gridTemplateRows: "30vh 50vh 20vh",
            background: '#DF2E0C',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
            }}>
            <TopLayout emoji={playerEmoji} icon={playerIcon} color={playerColor} oppEmoji={opponentEmoji} oppIcon={opponentIcon} oppColor={opponentColor} muted={mute}/>
            <Board starting={starting}/>
            <BottomLayout onChange={() => console.log("bottom layout change detected")} mute={mutePlayer} sendEmot={sendEmoji} exit={props.exit}/>
        </Container>
    );
}

const Dots = {
    game: <DotsGame />,
    thumbnail:
        <div>
            <h3 style={{marginBottom: '0.2rem'}}>Dots</h3>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={process.env.PUBLIC_URL + '/dots-thumbnail.png'} alt="dots-thumbnail" style={{width: '80%', height: '80%', borderRadius: '20px'}}/>
            </div>
        </div>,
    name: 'Dots'
};

export default Dots;