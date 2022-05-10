import {ProgressBar} from 'react-bootstrap';
import {styles} from '../styles/JavaScriptStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowLeft, faArrowRight, faArrowDown, faRotateLeft, faRotateRight, faCircleXmark, faShip, faBookSkull, faRocket } from '@fortawesome/free-solid-svg-icons'

export default function TopSection(props:any) {
    const Styles = styles(props.gameState,props.delta);
    return(
        <div style={props.gameState.gameStarted? Styles.statsSection : Styles.displayNoneStyles}>
        <div style={Styles.vs}>Vs.</div>
        <div style={Styles.powerLevelsContainer}>
            <div style={Styles.progressLeft}> <ProgressBar style={Styles.progressBarStyle} 
                                                    striped 
                                                    variant={props.gameState.energyLevel < 30? 'danger' : 'info'}
                                                    animated 
                                                    now={props.gameState.energyLevel} />
            </div>
            <div style={Styles.progressRight}> <ProgressBar style={Styles.progressBarStyle} 
                                                     striped 
                                                     variant={props.gameState.energyLevel < 30? 'danger' : 'info'}
                                                     animated 
                                                     now={props.gameState.energyLevel} />
            </div>
        </div>
        <div style={Styles.statsLeft}>
            <div style={Styles.playerTitle}>Player</div>
            <FontAwesomeIcon  
                        icon={faShip} 
                        className='shipStyles'
                     
                        size='4x'
                        />
            {props.gameState.turn == true ? 
                        <FontAwesomeIcon  
                            icon={faRocket} 
                            className='rocketStyles'
                            size='2x'
                        /> : null}
            
        </div>
        <div style={Styles.statsRight}>
            <div style={Styles.opponentTitle}>Opponent</div>
            <FontAwesomeIcon  icon={faBookSkull} 
                        className='skullStyles'
                
                        size='4x'
                        />
            {props.gameState.turn != true ? 
                        <FontAwesomeIcon  
                            icon={faRocket} 
                            className='opponentRocketStyles'
                            size='2x'
                        /> : null}
        </div>


    </div>
    )
}