import * as React from 'react';
import {AppBar, Box, Toolbar, Button, Stack} from '@mui/material';


export default function Header() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar className="header">
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    edge="start"*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="menu"*/}
                    {/*    sx={{ mr: 2 }}*/}
                    {/*>*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    <Stack direction='row' spacing={2}>
                        <Button color='inherit' className="active">Home</Button>
                        <Button color='inherit'>Favorites</Button>
                    </Stack>
                    <Button className="btn" sx={{marginLeft: "auto"}}
                            color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
