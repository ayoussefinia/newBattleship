interface GameInput {
    playerId: String;
    opponentId: String;
    data: String; // JSON.stringify the game's data object before calling mutation
}

export default GameInput;