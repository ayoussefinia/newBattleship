import "./TopLayout.css";
import PlayerDiv from "./PlayerDiv";
import MiddleDiv from "./MiddleDiv";

const TopLayout = (props:any) => {
  return ( //  Putting the emoji code didnt work but copy pasting it from the page did. Emoji code example -> &#128520
    <div className="top-layout">
      <PlayerDiv TheScore={24} Emoji={"😂"} PlayerName={"Intocable"} />
      <MiddleDiv/>
      <PlayerDiv TheScore={13} Emoji={"🙄"} PlayerName={"Kyle Butler"} /> 
    </div>
  );
};

export default TopLayout;
