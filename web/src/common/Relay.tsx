// import { gql, useSubscription } from "@apollo/client";

import React, { useEffect, useState, useContext } from "react";
import { gql, useMutation, useQuery} from '@apollo/client';
import { AppContext } from "../AppContext";
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

export default function Relay(props: any) {


  const TEST_MUTATION=gql`
  mutation {
      testMutation(payload: "hello")
  }
  `;
  useEffect(()=>{
    testMutation();
},[])

// var text = useContext(AppContext);
// console.log(text)
var text= {
  playerID:"hi now",
  data: {},
  opponentID: 'yoooooo'
}

// return <div><Game text={text}/></div>

  const [testMutation, { data, loading, error }] = useMutation(TEST_MUTATION);

  return <AppContext.Provider value={text}>{props.children}</AppContext.Provider>
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