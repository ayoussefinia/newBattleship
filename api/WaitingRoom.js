const Relay = require('./GameRelay.js');
const { v4: uuidv4 } = require('uuid');

const games = { };

exports.WaitingRoom = {
    queuePlayer: (game) => {
        console.log(game);
        if(!games[game]) {
            games[game] = { game, queue: [], queueLength: 0, activeGameCount: 0 };
        }
        const sessionId = uuidv4();
        games[game].queue.push({ sessionId, game });
        games[game].queueLength = games[game].queue.length;
        return sessionId;
    },
    getStatus: () => {
        return Object.keys(games).map(k => games[k]);
    }
};