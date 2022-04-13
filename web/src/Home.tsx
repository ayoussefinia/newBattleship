import { Box, Paper } from "@mui/material";
import { Key, ReactChild, ReactFragment, ReactPortal } from "react";

export default function Home(props : any) {

    function show(page : any) {
        props.setPage(page);
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