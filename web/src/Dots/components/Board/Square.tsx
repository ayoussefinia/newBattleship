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
        background: props.color,
        height: props.width,
        width: props.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px'
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