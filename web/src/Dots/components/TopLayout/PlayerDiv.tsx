import "./PlayerDiv.css";
import Rank from "./Rank";

const PlayerDiv = (props: any) => {
  const playerStyle = {
    color: props.playerColor,
  };

  const bdr = '1.5px solid ' + props.playerColor;

  return (
    <div className="player-div" style={{border: bdr, borderRadius: '12px'}}>

      <div className="player-name_wrapper">
        <label className="player-name" style={playerStyle}>
          {props.playerName}
        </label>
        <Rank rankColor={props.playerColor} rank={props.rank} />
      </div>

      <div className="flex flex-align flex-justify_center flex-column">
        <div className="center score">
          <div className="opensans">{props.score}</div>
        </div>
        <label className="center score-label label">Score</label>
      </div>

      <label className="center emoji">{props.emoji}</label>
    </div>
  );
};

export default PlayerDiv;
