import axios from 'axios';
import currencyFormatter from 'currency-formatter';

const axiosIntance = axios.create({
  baseURL: '/v1'
});

export const formatCurrency = (ammount) => {
  const decimalPlaces = `${ammount}`.split('.');
  const precision = decimalPlaces.length && decimalPlaces[1]
  && decimalPlaces[1].length > 1 ? `${ammount}`.split('.')[1].length : 2;
  return currencyFormatter.format(ammount,
      {decimal: '.', thousand: ',', precision})
}

export const prepareData = (sybmols, data) => {
  if (sybmols.length !== data.length) {
    throw new Error('sybmols.length !== data.length')
  }

  return sybmols.map((symbol, index) => {
    const {last_price, high, low} = data[index];

    return {
      name: symbol.toUpperCase(),
      last_price: formatCurrency(last_price),
      high: formatCurrency(high),
      low: formatCurrency(low)
    }
  });
}

export const prepareDetailsData = (symbol, data) => {
  const {last_price, high, low} = data;

  return [{
    name: symbol[0],
    last_price: formatCurrency(last_price),
    high: formatCurrency(high),
    low: formatCurrency(low)
  }]
}

export const getPairs = async () =>
    axiosIntance.get('/symbols').then(({data}) => data);

export const getPairDetails = async (pairSymbol) =>
    axiosIntance.get(`/pubticker/${pairSymbol}`).then(({data}) => data);