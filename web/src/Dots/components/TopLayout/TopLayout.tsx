import "./TopLayout.css";
import PlayerDiv from "./PlayerDiv";
import MiddleDiv from "./MiddleDiv";

const TopLayout = (props: any) => {
  const Rank: any = [];

  return (
    <div className="top-layout">
      <PlayerDiv
        Rank={3}
        PlayerColor={"#FFFF6D"}
        Score={24}
        Emoji={"😂"}
        PlayerName={"Intocable"}
      />
      <MiddleDiv />
      <PlayerDiv
        Rank={1}
        PlayerColor={"#12CDD4"}
        Score={13}
        Emoji={"🙄"}
        PlayerName={"Kyle Butler"}
      />
    </div>
  );
};

export default TopLayout;
