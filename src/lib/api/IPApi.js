// api/ipApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ipApi = createApi({
  reducerPath: 'ipApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ipify.org/?format=json' }),
  endpoints: (builder) => ({
    getIpAddress: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetIpAddressQuery } = ipApi;
