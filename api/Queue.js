

const waiting = {};

function add(key, value) {
    let resolve = value.resolve;
    let promiseObject = value.promiseObject;
    if(!resolve || !promiseObject) {
        promiseObject = new Promise((o) => {
            resolve = o;
        });
        value = { resolve, promiseObject, ... value };
    }
    waiting[key] = value;
    return promiseObject;
}

function get(key) {
    const res = waiting[key];
  //  delete waiting[key];
    return res;
}

function move(key, newKey) {
    waiting[newKey] = waiting[key];
  //  delete waiting[key];
    return waiting[newKey];
}

function playerConnected(game, player1) {
    const player2 = get(game);
    if(!player2) {
        console.log("player queued: " + JSON.stringify(player1) + " " + game);
        return add(game, player1);
    }
    return startGame(player1, player2, game);
}

function createGameData(player1, player2, game) {
    const gameData =  { playerId: player1.playerId, opponentId: player2.playerId };
    
    const player1Promise = add(player1.playerId, gameData);
    
    gameData.playerId = player2.playerId;
    gameData.opponentId = player1.playerI
    move(game, player2.playerId);
    return player1Promise;
}

function startGame(player1, player2, game) {
    const res = createGameData(player1, player2, game);
    if (Math.random() > 0.5) { // player1 chosen immediately send response to player1 and update player2 in queue
        console.log("Player 1 chosen, sending first move " + player1.playerId);
        reply(player1.playerId, JSON.stringify({ game: game, firstMove: true }));
    } else { // player2 chosen, queue player1's connection and respond to player2
        console.log("Player 2 chosen, sending first move " + player2.playerId);
        reply(player2.playerId, JSON.stringify({ game: game, firstMove: true }));
    }
    return res;   
}

function reply(playerId, data) {
    const res = get(playerId);
    res.resolve({ playerId: res.playerId, opponentId: res.opponentId, data: data });
}

function takeTurn(opponentId, data) {
    
    reply(opponentId, data.data);

    return add(data.playerId, data);
}
    
module.exports.queue = { playerConnected, takeTurn };