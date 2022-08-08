import { memo, useEffect, useState } from "react";
import PairsTable from "../components/PairsTable";
import {getPairDetails, prepareDetailsData} from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';

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
	const { listingId } = useParams();

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
		allowClick={false}
	/> :
	<Stack sx={{ width: '100%' }} spacing={2}>
		<Alert severity="warning">
			<AlertTitle>Warning</AlertTitle>
			Nothing to see here...
		</Alert>
	</Stack>
};

export default memo(Details);