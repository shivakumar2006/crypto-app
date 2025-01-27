import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 

const cryptoNewsHeaders = {
    'x-rapidapi-key': '84ee0f49c6msh9371c7c4efa6dc9p161378jsnf187f3924881',
    'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com' 

const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/v1/cryptodaily?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
}) 

export const { useGetCryptoNewsQuery } = cryptoNewsApi;