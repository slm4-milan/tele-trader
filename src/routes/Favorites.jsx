import {useState} from "react";
import PairsTable from '../components/PairsTable';
import {getPairDetails, prepareData} from "../services/api";
import useUserStore from '../store/user'

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
]

const Favorites = () => {

	const [isLoading, setIsLoading] = useState(null);
	const [error, setError] = useState(null)
	const [tableData, setTableData] = useState(null)
	const {isLoggedIn, favorites} = useUserStore();

	const init = async () => {
		try {
			const pairsData = await Promise.all(
					favorites.map((pair) => getPairDetails(pair)))
			setTableData(prepareData(favorites, pairsData))
		} catch (e) {
			setError(e);
			setTableData(null);
			console.error(`Error loading pairs ${e}`)
		} finally {
			setIsLoading(false)
		}
	}

	return <PairsTable
			keys={[
				{
					displayName: 'Name',
					name: 'name'
				},
				{
					displayName: 'Last',
					name: 'last'
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
			]}
			tableData={[
				{
					name: 'BTC',
					last: 1.2,
					change: '0.2%',
					high: 1.4,
					low: 1,
					id: 123
				},
				{
					name: 'ETHEREUM',
					last: 0.1,
					change: '5.1%',
					high: 2,
					low: 0.002,
					id: 124
				}
			]}
	/>
};

export default Favorites;