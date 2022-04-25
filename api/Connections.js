

const expired = { 

};
const waiting = {

};
const pings = {

};

function expireId(playerId) {
    expired[playerId] = pings[playerId];
    delete pings[playerId];
}

function signalDisconnect(playerId) {
    if(expired[playerId] && expired[playerId] != "none") pubSub.publish(expired[playerId], { error: "Other player disconnected" });
}

function isPlayerIdExpired(playerId) {
    return !pings[playerId] && !expired[playerId];
}

function checkForResponse(playerId, pong) {
    if(!pings[playerId]) { 
       signalDisconnect(playerId);
    } 
    else {
       expireId(playerId);
        pong();
     }
}

function setPings(playerId, opponentId) {
    if(isPlayerIdExpired(opponentId)) {
        signalDisconnect(playerId);
    } else {
        pings[playerId] = opponentId || none;
        delete expired[playerId];
    }
}


const openSocket = (game, playerId) => {
    function ping() { 
        this.pong = () => { setTimeout(() => checkForResponse(playerId, this.pong), 15000);  };
        this.pong();
    }

    const player1 = waiting[game];
    const player2 = playerId;
    
    if(!player1) {
        waiting[game] = player2;
        setPings(player2, "none");
    } else {
        delete waiting[game];
        setPings(player2, player1);
        startMatch(player1, player2);
    }
}; 

const startMatch = (player1, player2) => {
    player1.opponentId = player2.playerId;
    player2.opponentId = player1.playerId;

    pubSub.publish(player1.playerId, { playerId: player1.playerId, opponentId: player2.playerId, data: { start: true }});
};

const takeTurn = (msg, playerId) => {
    msg.playerId = msg.opponentId;
    msg.opponentId = playerId;
    if(msg.data.leaving) { 
        expireId(playerId);
        signalDisconnect(playerId);
    } else {
        pubSub.publish(msg.playerId, msg);
    }
};

/* {
    playerId,
    opponentId,
    data: { 
        // custom data object
     }
}  */

exports.Connections = {
    checkMatchStatus: game => {
        return "Not connected yet";
    },
    playerConnected: (msg) => {
        const playerId = uuidv4();
        msg.playerId = playerId;
        openSocket(msg.game, msg.playerId);
        return pubSub.asyncIterator(msg.playerId);        
    },
    incomingMessage: (msg) => {
        if(!msg.playerId) return;
        setPings(msg.playerId, msg.opponentId);
        if(msg.data) takeTurn(msg, msg.playerId);
    }
};