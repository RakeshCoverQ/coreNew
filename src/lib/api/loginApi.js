import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a custom fetchBaseQuery function with prepareHeaders
const baseQueryWithHeaders = fetchBaseQuery({
  baseUrl: 'https://garance.tangerine.insure/cbaNewEncrypt/cbaNew/v1/',
  prepareHeaders: (headers, { getState }) => {
    headers.set('SessionId', 'ABCD');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Create the loginApi with the custom baseQuery
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseQueryWithHeaders, // Use the custom fetchBaseQuery function
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: {encryptData:credentials},
      }),
    }),
  }),
});

// Export the generated hook
export const { useLoginMutation } = loginApi;
