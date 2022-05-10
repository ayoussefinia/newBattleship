import "./TopLayout.css";
import PlayerDiv from "./PlayerDiv";
import MiddleDiv from "./MiddleDiv";

const TopLayout = (props:any) => {
  return ( //  Putting the emoji code didnt work but copy pasting it from the page did. Emoji code example -> &#128520
    <div className="top-layout_container">
      <div className="top-layout">
        <PlayerDiv 
          rank={props.playerIcon}
          playerColor={props.playerColor} 
          score={props.playerScore} 
          emoji={props.emoji} 
          playerName={props.playerName}
        />
        <MiddleDiv />
        <PlayerDiv 
          rank={props.oppIcon}
          playerColor={props.oppColor} 
          score={props.oppScore} 
          emoji={props.muted ? "" : props.oppEmoji} 
          playerName={props.oppName}
        /> 
      </div>
    </div>
  );
};

export default TopLayout;
