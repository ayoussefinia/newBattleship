import "./TopLayout.css";
import PlayerDiv from "./PlayerDiv";
import MiddleDiv from "./MiddleDiv";
import Rank from "./Rank";

const TopLayout = (props:any) => {

 const Rank : any = [];    
    
      return (
    <div className="top-layout">
      <PlayerDiv Rank={0} PlayerColor={"#FFFF6D"} TheScore={24} Emoji={"😂"} PlayerName={"Intocable"} />
      <MiddleDiv/>
      <PlayerDiv Rank={1} PlayerColor={"#12CDD4"} TheScore={13} Emoji={"🙄"} PlayerName={"Kyle Butler"} /> 
    </div>
  );
};

export default TopLayout;