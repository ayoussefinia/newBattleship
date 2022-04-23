import "./PlayerDiv.css";

const PlayerDiv = (props: any) => {
  return (
    <div className="player-div">
      <label className="player-name">{props.PlayerName}</label>
      <div className="score">{props.TheScore}</div>
      <label className="score-label">Score</label>
      <label className="emoji">{props.Emoji}</label>
    </div>
  );
};

export default PlayerDiv;
