import "./PlayerDiv.css";
import Rank from "./Rank";
const PlayerDiv = (props: any) => {

const PlayerStyle= {
  color: props.PlayerColor,
}

  return (
    <div className="player-div">
      <label className="player-name" style={PlayerStyle}>{props.PlayerName}</label>
      <Rank Rank={props.Rank}/>
      <div className="center score">
      <div>{props.TheScore}</div>
      </div>
      <label className="center score-label">Score</label>
      <label className="center emoji">{props.Emoji}</label>
    </div>
  );
};

export default PlayerDiv;




