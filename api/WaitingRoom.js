const { v4: uuidv4 } = require('uuid');

const games = { };
const playerQueue = { };

function addPlayerId(game, playerId) {
    games[game] = playerId;
    playerQueue[playerId] = game;
}

exports.WaitingRoom = {
    queuePlayer: (game) => {
        console.log(game);
        const playerId = uuidv4();
        addPlayerId(playerId, game);
        return { playerId, opponentId: "none" };
    },
    getStatus: () => {
        return Object.keys(games).map(k => games[k]);
    },
    removePlayerId: (playerId) => {
        const game = playerQueue[playerId];
        delete playerQueue[playerId];
        return game;
    }
};