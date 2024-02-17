import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithCustomHeaders } from '../baseQuery';

const customMasterCodesApi = createApi({
  reducerPath: 'customMasterCodesApi',
  baseQuery: baseQueryWithCustomHeaders({}), 
  endpoints: (builder) => ({
    getAllMasterCodesPagination: builder.query({
      query: (queryParams, sessionType) => {
        return {
          url: `getAllMasterCodesPagination?${new URLSearchParams(queryParams).toString()}`,
          headers: {
            SessionType: sessionType,
          },
        };
      },
    }),
  }),
});

// Export the generated hook from the custom API instance
export const useCustomGetAllMasterCodesPaginationQuery = customMasterCodesApi.endpoints.getAllMasterCodesPagination.useQuery;
