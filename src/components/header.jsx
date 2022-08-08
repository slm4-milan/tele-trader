import * as React from 'react';
import {AppBar, Box, Toolbar, Button, Stack} from '@mui/material';
import useAuthStore from '../store/auth';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuthStore();
    const navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar className="header">
                    <Stack direction='row' spacing={2}>
                        <Button 
                            color='inherit'
                            onClick={() => {
                                navigate('/');
                            }}
                        >Home</Button>
                        {
                            isLoggedIn && 
                            <Button 
                                color='inherit'
                                onClick={() => {
                                    navigate('/favorites');
                                }}
                            >Favorites</Button>
                        }
                    </Stack>
                    {
                        isLoggedIn ? 
                            <Button 
                                className="btn" 
                                sx={{marginLeft: "auto"}} 
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    navigate('/');
                                }}
                            >Logout</Button>
                            :
                            <Button 
                                className="btn" 
                                sx={{marginLeft: "auto"}}
                                onClick={() => {
                                    setIsLoggedIn(true);
                                }}
                            >Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;