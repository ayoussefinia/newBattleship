// import { gql, useSubscription } from "@apollo/client";

import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation, useQuery} from '@apollo/client';
import { AppContext } from "../AppContext";
import { v4 as uuidv4 } from 'uuid';
// interface Game {
//   playerId: String;
//   opponentId: String;
//   data: any;
// }

// const QUEUE_PLAYER = gql`
//   subscription Subscription($game: String!) {
//     playerConnected(game: $game) {
//       playerId
//       opponentId
//       data
//     }
//   }
// `;

export default  function Relay(props: any) {

  const INITIALIZE_GAME=gql`
  mutation($payload: String!) {
      startGame(payload: $payload)
  }
  `;

  const [startGame, { data, loading, error }] = useMutation(INITIALIZE_GAME);
  // const [testMutation] = useMutation(TEST_MUTATION);

//   useEffect(()=>{
//     testMutation();
// },[])


if(!localStorage.getItem("uuid")) {
  const uuid = uuidv4();
  localStorage.setItem("uuid", uuid)
}

const uuid = JSON.stringify(localStorage.getItem("uuid"));
var initializeGameData= {
  gameName:props.name,
  playerID:uuid,
}
 useEffect(()=>{

  // var text = useContext(AppContext);
  // console.log(text)


  const stringData=JSON.stringify(initializeGameData)
  // testMutation({variables: {payload:"hello"}})
  const mutationData = {
    variables: {payload:stringData},
  
    update: (proxy:any, mutationReturnData:any)=>{
      console.log(JSON.parse(mutationReturnData.data.startGame))
      const returnGameData = JSON.parse(mutationReturnData.data.startGame)
      if(returnGameData.turn !=undefined) {
        console.log('another player joined, game started, gameData:', returnGameData)
      }

      console.log('waiting for another player')
    }
  };
  startGame(mutationData)

  if(error) {
    console.log('start game mutation error: ', error);
  }
  if(loading) {
    console.log('start game mutation loading: ', loading);
  }
// setState({data:gameData})
},[])

 return <AppContext.Provider value={initializeGameData}>{props.children}</AppContext.Provider>
}

// var Wrapper = React.createClass({
//   render: function() {
//     return (
//       <div className="wrapper">
//         before
//           {this.props.children}
//         after
//       </div>
//     );
//   }
// });
// export default function Relay(props: any) {

//   console.log(props.children)
//       const child = props.children[0];

//       child.props.takeTurn = (data: any) => {

//       };

//       const { data, loading } = useSubscription<Game>(
//           QUEUE_PLAYER,
//           { variables: { game: props.game } }
//       );

//       useEffect(() => {
//           child.props.setTurn(data?.data)
//       }, [data]);

//     return child;

// }
// class Relay extends Component {
  //   constructor(props: any){
  //     super(props)
  //     // props.children[0].props.something = 'hello';
  //    this.state = {greeting: 'hello'}
  
  //   }
  
    
  //   render() {
  //     return (<div>{this.props.children}</div>);
  //   }
  // }
  
  // export default Relay;

  // export default  function Relay(props: any) {
    // const [state, setState] = useState({
    //   gameName:'',
    //   gameId:'',
    //   playerID:'',
    //   opponentID: '',
    //   turn:'',
    //   turnCount:0,
    //   playerTurnData:{},
    //   opponentTurnData:{},
    //   playerTurnReceivedByOpponent:false,
    //   opponentTurnReceivedByPlayer: false,
    //   gameData: {},
    //   gameOver: false
    // })
    
    //   const INITIALIZE_GAME=gql`
    //   mutation($payload: String!) {
    //       startGame(payload: $payload)
    //   }
    //   `;
    //   const TEST_MUTATION=gql`
    //   mutation($payload:String!) {
    //     testMutation(payload: $payload)
    //   }
    //   `
    //   const [startGame, { data, loading, error }] = useMutation(INITIALIZE_GAME);
    //   // const [testMutation] = useMutation(TEST_MUTATION);
    
    // //   useEffect(()=>{
    // //     testMutation();
    // // },[])
    
    // useEffect(()=>{
    //                 console.log('game started gameState : ', state);
                    
    //               },[state])
    
    //  useEffect(()=>{
    
    //   // var text = useContext(AppContext);
    //   // console.log(text)
    //   if(!localStorage.getItem("uuid")) {
    //     const uuid = uuidv4();
    //     localStorage.setItem("uuid", uuid)
    //   }
      
    //   const uuid = JSON.stringify(localStorage.getItem("uuid"));
    //   var initializeGameData= {
    //     gameName:props.name,
    //     playerID:uuid,
    //   }
    
    //   const stringData=JSON.stringify(initializeGameData)
    //   // testMutation({variables: {payload:"hello"}})
    //   const mutationData = {
    //     variables: {payload:stringData},
      
    //     update: (proxy:any, mutationReturnData:any)=>{
    //       console.log(JSON.parse(mutationReturnData.data.startGame))
    //       const returnGameData = JSON.parse(mutationReturnData.data.startGame)
    //       if(returnGameData.turn !=undefined) {
    //         const game = {
    //           gameName:returnGameData.gameName,
    //           gameId:returnGameData.gameId,
    //           playerID: uuid,
    //           opponentID: returnGameData.player1ID == uuid? returnGameData.player2ID : returnGameData.player1ID,
    //           turn:returnGameData.turn,
    //           turnCount:returnGameData.turnCount,
    //           playerTurnData:returnGameData.player1ID == uuid? returnGameData.player1TurnData: returnGameData.player2TurnData,
    //           opponentTurnData:returnGameData.player1ID == uuid? returnGameData.player2TurnData: returnGameData.player1TurnData,
    //           playerTurnReceivedByOpponent:returnGameData.player1ID == uuid?returnGameData.player1TurnReceived: returnGameData.player2TurnReceived,
    //           opponentTurnReceivedByPlayer: returnGameData.player1ID == uuid?returnGameData.player2TurnReceived: returnGameData.player1TurnReceived,
    //           gameData: returnGameData.gameData,
    //           gameOver: returnGameData.gameOver
    //         }
    //         setState(game)
    //         return;
    //       }
    
    //       console.log('waiting for another player')
    //       setState({...state, gameName:props.name, playerID: uuid})
    //     }
    //   };
    //   startGame(mutationData)
    
    //   if(error) {
    //     console.log('start game mutation error: ', error);
    //   }
    //   if(loading) {
    //     console.log('start game mutation loading: ', loading);
    //   }
    // // setState({data:gameData})
    // },[])
    
    //  return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>
    // }