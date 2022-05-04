import { gql, useSubscription } from "@apollo/client";
import { Box, Paper } from "@mui/material";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";
import Relay from "./common/Relay";
import { v4 } from "uuid";


export default function Home(props : any) {
    
    function exit() {
        props.setPage(null);
    }

    function show(page : any, name: string) {
        props.setPage(<Relay name={name} exit={exit} page={page} playerId={v4()}/>);
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
            {props.pages.map((page: { name: string; game: string; thumbnail: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => 
                <Paper key={page.name} elevation={3} onClick={() => show(page.game, page.name)}>
                    {page.thumbnail}
                </Paper>
            )}
        </Box>
    </div>);
}
