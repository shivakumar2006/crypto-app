import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CryptoApiHeaders = { 
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

console.log('API Key:', process.env.REACT_APP_RAPID_API_KEY);


const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: CryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers=1&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`)
        })
    })
})

export const { useGetCryptosQuery } = cryptoApi;


// const baseURL = 'https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl';
// const url = 'https://coinranking1.p.rapidapi.com/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=50&offset=0&orderBy=24hVolume&orderDirection=desc';
// const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': '84ee0f49c6msh9371c7c4efa6dc9p161378jsnf187f3924881',
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
//     }
//   };