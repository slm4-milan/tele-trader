import { memo, useEffect, useState } from "react";
import PairsTable from "../components/PairsTable";
import {getPairs, getPairDetails, prepareData} from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

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
		displayName: 'Change Percent',
		name: 'change'
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

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tableData, setTableData] = useState(null);

	const init = async () => {
		try {
			const pairs = await getPairs();
			const pairsToFetch = pairs.slice(0, 5);
			const pairsData = await Promise.all(pairsToFetch.map((pair) => getPairDetails(pair)));
			setTableData(prepareData(pairsToFetch, pairsData));
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
		return <Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity="error">
				<AlertTitle>Error</AlertTitle>
				Error Fetching Pairs, <strong>please try latter.</strong>
			</Alert>
		</Stack>
	}

	if (isLoading) {
		return <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 200, alignItems: 'center' }}>
			<CircularProgress />
		</Box>
	}

	return tableData ? <PairsTable 
		keys={tableKeys}
		tableData={tableData}
		allowClick
	/> :
	<Stack sx={{ width: '100%' }} spacing={2}>
		<Alert severity="warning">
			<AlertTitle>Warning</AlertTitle>
			Nothing to see here...
		</Alert>
	</Stack>
};

export default memo(Home);