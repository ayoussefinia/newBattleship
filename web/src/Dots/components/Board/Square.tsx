import Rank from '../../Rank';

const Square = (props: any) => {
    const squareContainerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    
    const squareStyle = {
        color: props.color,
        height: props.width,
        width: props.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem'
    };

    return(
        <div style={squareContainerStyle}>
            <div style={squareStyle}>
                {props.won && props.label}
            </div>
        </div>
    );
}

export default Square;