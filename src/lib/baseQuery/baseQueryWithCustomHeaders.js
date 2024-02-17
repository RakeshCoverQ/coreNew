export const baseQueryWithCustomHeaders = (customHeaders) => fetchBaseQuery({
    baseUrl: 'https://garance.tangerine.insure/cbaNewEncrypt/cbaNew/v1/',
    prepareHeaders: (headers, { getState }) => {
      // Merge custom headers with default headers
      for (const [key, value] of Object.entries(customHeaders)) {
        headers.set(key, value);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });