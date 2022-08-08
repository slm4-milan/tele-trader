import {memo, useEffect, useMemo, useState} from "react";
import PairsTable from "../components/PairsTable";
import {getPairDetails, prepareData} from '../services/api';
import {Alert, AlertTitle, Box, CircularProgress, Stack} from '@mui/material';
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
    displayName: 'Change',
    name: 'change'
  },
  {
    displayName: 'Change Percent',
    name: 'change_percent'
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

const Favorites = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(null);
  const {isLoggedIn, favorites} = useUserStore();

  const init = async () => {
    try {
      const pairsData = await Promise.all(
          favorites.map((pair) => getPairDetails(pair)));
      setTableData(prepareData(favorites, pairsData));
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

  const table = useMemo(() => <PairsTable
      keys={tableKeys}
      tableData={tableData}
      allowClick
      autoUpdate
  />, [tableData])

  if (!isLoggedIn) {
    return <Stack sx={{width: '100%'}} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        401 <strong>not authenticated!</strong>
      </Alert>
    </Stack>
  }

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

  return tableData ? table :
      <Stack sx={{width: '100%'}} spacing={2}>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Nothing to see here...
        </Alert>
      </Stack>
};

export default memo(Favorites);