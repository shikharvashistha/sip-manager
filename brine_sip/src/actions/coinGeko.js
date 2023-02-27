import axios from 'axios';

export const getCryptoValues = async (setData, id) => {
  try {
    let res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${
        id ? 'ids=' + id : ''
      }&order=market_cap_desc&per_page=4&page=1&sparkline=false`,
    );
    setData(res.data);
    await new Promise(resolve => setTimeout(resolve, 10000));
    await getCryptoValues();
  } catch (err) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    await getCryptoValues();
  }
};
