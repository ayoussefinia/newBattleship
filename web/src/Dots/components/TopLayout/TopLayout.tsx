import "./TopLayout.css";
import PlayerDiv from "./PlayerDiv";
import MiddleDiv from "./MiddleDiv";

const TopLayout = (props:any) => {
  return ( //  Putting the emoji code didnt work but copy pasting it from the page did. Emoji code example -> &#128520
    <div className="top-layout_container">
      <div className="top-layout">
        <PlayerDiv 
          rank={props.icon}
          playerColor={props.color} 
          score={24} 
          emoji={props.emoji} 
          playerName={"Intocable"}
        />
        <MiddleDiv />
        <PlayerDiv 
          rank={props.oppIcon}
          playerColor={props.oppColor} 
          score={13} 
          emoji={props.muted ? "" : props.oppEmoji} 
          playerName={"Kyle Butler"}
        /> 
      </div>
    </div>
  );
};

export default TopLayout;
