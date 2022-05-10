import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Board from './components/Board/Board';
import TopLayout from './components/TopLayout/TopLayout';
import BottomLayout from './components/BottomLayout/BottomLayout';
import './DotsApp.css';

function DotsGame( props: any) {
    const [playerEmoji, setPlayerEmoji] = useState("");
    const [playerIcon, setPlayerIcon] = useState(null);
    const [playerColor, setPlayerColor] = useState("#FFFF6D");
    const [playerName, setPlayerName] = useState("");
    const [playerScore, setPlayerScore] = useState(0);
    const [oppName, setOppName] = useState("");
    const [opponentEmoji, setOpponentEmoji] = useState("");
    const [opponentIcon, setOpponentIcon] = useState(null);
    const [opponentColor, setOpponentColor] = useState("#12CDD4");
    const [oppScore, setOpponentScore] = useState(0);
    const [mute, setMute] = useState(false);
    const [oppTurn, setOppTurn] = useState({dummy: "data", lineNo: "5", color: "#12CDD4"})
    const [c, setC] = useState(0);

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
    }

    // TODO: set the opponontEmoji state when emoji message received from opponent

    function add(){
        let cc = c + 1;
        setC(cc);
    }
    
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
            <TopLayout emoji={playerEmoji} 
                playerIcon={playerIcon} 
                playerColor={playerColor} 
                playerName={playerName}
                playerScore={playerScore}
                oppEmoji={opponentEmoji} 
                oppIcon={opponentIcon} 
                oppColor={opponentColor}
                oppName={oppName}
                oppScore={oppScore} 
                muted={mute}/>
            <Board playerId="dummy_id" 
                color={playerColor} 
                oppTurn={oppTurn} 
                oppColor={opponentColor} 
                count={c}
                takeTurn={props.takeTurn}/>
            <BottomLayout mute={mutePlayer} 
                sendEmot={sendEmoji} 
                exit={props.exit}/>
            
        </Container>
    );
}

const Dots = {
    game: <DotsGame />,
    thumbnail:
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h3 style={{margin: '1em auto 0.5em auto'}}>Dots</h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={process.env.PUBLIC_URL + '/dots-thumbnail.png'} alt="dots-thumbnail" style={{width: '75%', height: '75%', borderRadius: '0px'}}/>
            </div>
        </div>,
    name: 'Dots'
};

export default Dots;