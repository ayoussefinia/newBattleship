import "./MiddleDiv.css";

const MiddleDiv = () => {
  return (
    <div className="middle-div">
      <div className="flex flex-justify_center flex-align_center">
        <label className="vs-label">VS</label>
      </div>
      <div className="flex flex-justify_center flex-column">
        <div className="center time">
          <div className="opensans">8.7s</div>
        </div>
        <label className="center time-label label">Time Left</label>
      </div>
    </div>
  );
};

export default MiddleDiv;
