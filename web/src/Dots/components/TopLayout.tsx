import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/TextField';


const scoreStyle = {
    width: "30px",
    height:"30px",
    borderRadius: '20%',
    background: "grey",
};

const TopLayout=()=> {

    return (
        <Box>
            <Grid container  width={305} height={40} columns={3} justifyContent={"center"}>
                <div style={scoreStyle}></div>
                <div style={scoreStyle}></div>
            </Grid>
        </Box>
    )
}

export default TopLayout;

//<div style={scoreStyle}>0</div>
//<div style={scoreStyle}>0</div>