import * as React from 'react';
import {Alert, AlertTitle, Stack} from '@mui/material';

const NotFound = () => {
  return <Stack sx={{width: '100%'}} spacing={2}>
    <Alert severity="error">
      <AlertTitle>404</AlertTitle>
      Page <strong>not found!</strong>
    </Alert>
  </Stack>
};

export default NotFound;