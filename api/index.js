const { ApolloServer } = require('apollo-server');
const { Connections } = require("./Connections");
const { schema } = require('./schema')

const { randomUUID } = require('crypto');

let waitingRoom = [];
let activeGames = [];

  const typeDefs = schema;

  const resolvers = {
    Query: {
      getGameData: (parent, {payload})=> {
        console.log('get game data called')
        for(var i=0; i<activeGames.length; i++) {
          if(activeGames[i].player1ID == payload || activeGames[i].player2ID == payload) {
            console.log('active game found: ', activeGames[i]);
            return JSON.stringify(activeGames[i])
          }
        }
        return 'no game found'
      },

      // checkMatchStatus: game => Connections.checkMatchStatus(game),
      testQuery: (parent, {payload})=> {return payload+payload}
    },
    Mutation: {
      turnResult: (parent, {payload}, context, info)=> {

        const uuid = payload;

        for(var i=0; i<activeGames.length; i++) {
          if(activeGames[i].player1ID == uuid || activeGames[i].player2ID==uuid) {
            console.log('turn result active game found')
            if(activeGames[i].player1ID == uuid ) {
              activeGames[i].player2TurnReceived = true;
            }
            else {activeGames[i].player1TurnReceived=true}
            if(activeGames[i].player1TurnReceived ==true && activeGames[i].player2TurnReceived==true){
              if(activeGames[i].turn==activeGames[i].player1ID) {
                activeGames[i].turn=activeGames[i].player2ID
              } else{activeGames[i].turn = activeGames[i].player1ID}
              activeGames[i].turnCount++;
              activeGames[i].player1TurnData= {};
              activeGames[i].player2TurnData={};
              activeGames[i].player1TurnReceived=false;
              activeGames[i].player2TurnReceived= false;
            }
            return JSON.stringify(activeGames[i])
          }
        }
      },
      takeTurn: async (parent, {payload}, context, info) => { 
       //   Connections.takeTurn(args);
       const parsedData = JSON.parse(payload);
       const uuid = parsedData.uuid;
       const turnData = parsedData.turnData;
       for(var i=0; i<activeGames.length; i++) {
         if(activeGames[i].player1ID == uuid || activeGames[i].player2ID==uuid) {
           console.log('take turn active game found')
           if(activeGames[i].player1ID == uuid ) {
             activeGames[i].player1TurnData = turnData
           }
           else {activeGames[i].player2TurnData=turnData}
           return JSON.stringify(activeGames[i])
         }
       }
        console.log('take turn mutation called, active game not found')
        return payload
      },
      startGame: (parent, {payload}, context, info) => { 
        const game = JSON.parse(payload);
        console.log('start game called game Data::::', game)
        for(var i=0; i<waitingRoom.length; i++) {
          if(waitingRoom[i].gameName == game.gameName){
              const player1 = waitingRoom.splice(i,1);
              const player1ID=player1[0].playerID
              const player2ID = game.playerID;
              const gameId =Math.random().toString().slice(2, 15);
              const turn = Math.random() > .5 ? player1ID : player2ID;
              const Game = {
                gameName: game.gameName,
                gameId: gameId,
                player1ID: player1ID,
                player2ID: player2ID,
                turn: turn,
                turnCount: 0,
                player1TurnData: {},
                player2TurnData: {},
                player1TurnReceived:false,
                player2TurnReceived: false,
                gameData: {},
                gameOver: false
              }
              activeGames.push(Game)
              console.log('pushed to active games: ',activeGames)
              return JSON.stringify(Game)
          }
        }

        waitingRoom.push(game);
        console.log('pushed to waiting room: ', waitingRoom)
        return JSON.stringify(game);
      },
      testMutation:(parent, {payload})=>{
        console.log('test mutation called')
        return payload }
    }
  };



  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });




  // takeTurn: async (parent, args, context, info) => { 
  //   //   Connections.takeTurn(args);
  //      const response = new Promise((success, failure) => {
  //        setTimeout(() => 
  //        success({
  //          playerId: randomUUID(),
  //          opponentId: randomUUID(),
  //          data: JSON.stringify({ row: 1, col: 1})
  //        }), 5000);
  //      });
  //      return await response;
  //  },