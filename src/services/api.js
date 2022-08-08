import axios from 'axios';

const axiosIntance = axios.create({
	baseURL: '/v1'
});

export const prepareData = (sybmols, data) => {
	if (sybmols.length !== data.length) {
		throw new Error('sybmols.length !== data.length')
	}

	return sybmols.map((symbol, index) => {
		const { last_price, high, low } = data[index];

		return {
			name: symbol,
			last_price,
			high,
			low
		}
	});
}

export const prepareDetailsData = (symbol, data) => {
	const { last_price, high, low } = data;

	return [{
		name: symbol,
		last_price,
		high,
		low
	}]
}

export const getPairs = async () => 
	axiosIntance.get('/symbols').then(({data}) => data);

export const getPairDetails = async (pairSymbol) => 
	axiosIntance.get(`/pubticker/${pairSymbol}`).then(({data}) => data);