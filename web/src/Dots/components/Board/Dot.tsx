const Dot = () => {
    const containerStyle = {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const dotStyle = {
        background: 'white',
        borderRadius: '50%',
        //height: 'auto',
        width: '75%',
        paddingBottom: '75%',
    };

    return(
        <div style={containerStyle}>
            <div style={dotStyle}></div>
        </div>
    );
}

export default Dot;