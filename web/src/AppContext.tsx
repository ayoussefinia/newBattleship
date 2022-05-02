import React from 'react';

const AppContext = React.createContext({
    gameName:'',
    playerID:'',
});

export { AppContext };

// const AppContext = React.createContext({
//     gameName:'',
//     gameId:'',
//     playerID:"hello",
//     opponentID: 'dqwdwqwdq',
//     turn:'',
//     turnCount:0,
//     playerTurnData:{},
//     opponentTurnData:{},
//     playerTurnReceivedByOpponent:false,
//     opponentTurnReceivedByPlayer: false,
//     gameData: {},
// });
