import * as React from 'react';
import {AppBar, Box, Button, Stack, Toolbar} from '@mui/material';
import useUserStore from '../store/user';
import {useLocation, useNavigate} from 'react-router-dom';

const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  return (
      <Box sx={{flexGrow: 1, marginBottom: 2}}>
        <AppBar position="static">
          <Toolbar className="header">
            <Stack direction='row' spacing={2}>
              <Button
                  className={location.pathname === '/' ? 'active' : ''}
                  color='inherit'
                  onClick={() => {
                    navigate('/');
                  }}
              >Home</Button>
              {
                  isLoggedIn &&
                  <Button
                      className={location.pathname === '/favorites' ? 'active'
                          : ''}
                      color='inherit'
                      onClick={() => {
                        navigate('/favorites');
                      }}
                  >Favorites</Button>
              }
            </Stack>
            {
                !isLoggedIn &&
                <Button
                    className="btn"
                    sx={{marginLeft: "auto"}}
                    onClick={() => {
                      setIsLoggedIn(true);
                    }}>Login
                </Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default Header;