import { createApi, fetchBaseQuery } from '@reduxjs/toolkit';

const CryptoApiHeaders = { 
    'x-rapidapi-key': '84ee0f49c6msh9371c7c4efa6dc9p161378jsnf187f3924881',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

const baseURL = 'https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl';

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseURL }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => '/exchanges'
        })
    })
})

// const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': '84ee0f49c6msh9371c7c4efa6dc9p161378jsnf187f3924881',
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
//     }
//   };