import { Box, Paper } from "@mui/material";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import Relay from "./common/Relay";


export default function Home(props : any) {
    
    function exit() {
        props.setPage(null);
    }

    function show(page : any) {
        //console.log(typeof page());
        props.setPage(<Relay exit={exit}>{page}</Relay>);
        //props.setPage(<Relay>{React.cloneElement(page, { test: "hiiiuuuu", exit: exit })}</Relay>);
    }
    
    return (<div>
        <h1>Welcome!</h1>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 256,
                    height: 256
                },
            }}
        >
            {props.pages.map((page: { name: Key | null | undefined; game: any; thumbnail: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => 
                <Paper key={page.name} elevation={3} onClick={() => show(page.game)}>
                    {page.thumbnail}
                </Paper>
            )}
        </Box>
    </div>);
}
