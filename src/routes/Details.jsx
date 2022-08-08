import {memo, useEffect, useState} from "react";
import PairsTable from "../components/PairsTable";
import {getPairDetails, prepareDetailsData} from '../services/api';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Stack
} from '@mui/material';
import {useParams} from 'react-router-dom';
import useUserStore from '../store/user';

const tableKeys = [
  {
    displayName: 'Name',
    name: 'name'
  },
  {
    displayName: 'Last',
    name: 'last_price'
  },
  {
    displayName: 'High',
    name: 'high'
  },
  {
    displayName: 'Low',
    name: 'low'
  }
];

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(null);
  const {listingId} = useParams();
  const {
    isLoggedIn,
    isFavorite,
    addToFavorites,
    removeFromFavorites
  } = useUserStore();

  const init = async () => {
    try {
      const pairsData = await getPairDetails(listingId);
      setTableData(prepareDetailsData([listingId], pairsData));
    } catch (e) {
      setError(e);
      setTableData(null);
      console.error(`Error loading pairs ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setError(null);
    setTableData(null);

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <Stack sx={{width: '100%'}} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Error Fetching Pairs, <strong>please try latter.</strong>
      </Alert>
    </Stack>
  }

  if (isLoading) {
    return <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      minHeight: 200,
      alignItems: 'center'
    }}>
      <CircularProgress/>
    </Box>
  }

  return tableData ?
      <>
        <PairsTable
            keys={tableKeys}
            tableData={tableData}
            allowClick={false}
        />
        {isLoggedIn && <Box sx={{display: 'flex'}}>
          {isFavorite(tableData[0].name) ?
              <Button
                  variant="contained"
                  color={'error'}
                  onClick={() => {
                    removeFromFavorites(tableData[0].name)
                  }}>Remove from Favorites</Button> :
              <Button
                  variant="contained"
                  color={'error'}
                  onClick={() => {
                    addToFavorites(tableData[0].name)
                  }}>Add to Favorites</Button>}
        </Box>}
      </> :
      <Stack sx={{width: '100%'}} spacing={2}>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Nothing to see here...
        </Alert>
      </Stack>
};

export default memo(Details);