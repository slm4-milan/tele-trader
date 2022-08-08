import { memo, useEffect, useState, useMemo } from "react";
import PairsTable from "../components/PairsTable";
import {getPairs, getPairDetails, prepareData} from '../services/api';
import {CircularProgress, Box, Alert, AlertTitle, Stack} from '@mui/material'

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

	const table = useMemo(()=>
	<PairsTable
		keys={tableKeys}
tableData={tableData}
allowClick
autoUpdate/>, [tableData])

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

	return tableData ? table :
	<Stack sx={{ width: '100%' }} spacing={2}>
		<Alert severity="warning">
			<AlertTitle>Warning</AlertTitle>
			Nothing to see here...
		</Alert>
	</Stack>
};

export default memo(Home);