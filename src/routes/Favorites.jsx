import PairsTable  from '../components/PairsTable';

const Favorites = () => {
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