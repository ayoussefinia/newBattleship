const dotStyle = {
    background: 'white',
    borderRadius: '50%',
    height: '15px',
    width: '15px'
};

const containerStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Dot = () => {

    return(
        <div style={containerStyle}>
            <div style={dotStyle}></div>
        </div>
    );
}

export default Dot;