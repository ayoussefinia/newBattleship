

const waiting = {};

const newPromise = (key, game) => {
    return new Promise((resolve) => {
        waiting[key] = { resolve: resolve, payload: game };
    });
};

const queue = (key, player1) => {
    if (waiting[key]) { // a connection is open and awaiting data

        const player2 = waiting[key];
        delete waiting[key];
        
        console.log("Request recieved: " + key + " " + JSON.stringify(player1))
        if (player2.payload.opponentId) {  // Already in game, relay data to the stored connection
            console.log("Relaying data from " + player1.playerId + " to " + player2.payload.playerId + " data: " + player1.data);
            player2.payload.data = player1.data;
            player2.resolve(player2.payload);
            return newPromise(player1.playerId, player1);
        } else { // Starting match
            // Decide first player
            if (Math.random() > 0.5) { // player1 chosen immediately send response to player1 and update player2 in queue
                console.log("Player 1 chosen, sending first move " + player1.playerId);
                player2.payload.opponentId = player1.playerId;
                waiting[player2.payload.playerId] = player2.payload;
                return Promise.resolve({ playerId: player1.playerId, opponentId: player2.payload.playerId, data: player1.data });
            } else { // player2 chosen, queue player1's connection and respond to player2
                console.log("Player 2 chosen, sending first move " + player2.payload.playerId);
                player2.payload.opponentId = player1.playerId;
                player2.resolve(player2.payload);
                return newPromise(player1.playerId, player1);
            }
        }
    } else {  // No opponent matched or opponent disconnected
        console.log("player queued: " + JSON.stringify(player1) + " " + key);
        return newPromise(player1.data, player1);
    }
};

module.exports.queue = queue;