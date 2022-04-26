const Dot = () => {
    const dotStyle = {
        background: 'white',
        borderRadius: '50%',
        height: '12.75px',
        width: '12.75px',
        transform: 'scale(1.5)'
    };
    
    const containerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return(
        <div style={containerStyle}>
            <div style={dotStyle}></div>
        </div>
    );
}

export default Dot;