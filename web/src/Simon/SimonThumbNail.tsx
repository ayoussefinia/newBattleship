import Simon from "./Simon";
import React, { useRef} from "react";
import logo from './simon.jpg'




function game( props: any) {
    return <div><Simon></Simon></div>
} 

const SimonThumbNail = {
    game: game,
    thumbnail: <div>
        <div className="centerWrapper">
            <h3>Simon</h3>
        </div>
        <div className="centerWrapper">
            <img src={logo} width="50%"></img>
        </div>
    </div>,
    name: 'SimonThumbNail'
}

export default SimonThumbNail;