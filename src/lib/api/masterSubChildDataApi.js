import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithCustomHeaders } from '../baseQuery';
import { AesCipher, IsEmpty } from '../../utility/handler';

export const masterSubChildDataApi = createApi({
    reducerPath: 'masterSubChildDataApi',
    baseQuery: baseQueryWithCustomHeaders(),
    endpoints: (builder) => ({
        getMasterSubChildData: builder.mutation({
            query: ({encryptData,SessionType}) => ({
                url: `getAllMasterCodesPagination`,
                method: 'POST',
                headers: {
                    ServiceType: SessionType,
                },
                body: {encryptData},
            }),
            transformResponse: (response) => {
                if (!IsEmpty(response?.data)) {
                    const decryptedData = AesCipher.decrypt(response?.data);
                    response.data = JSON.parse(decryptedData)
                }
                
                return { ...response, customField: 'customValue' };
              },
        }),
    }),
});

export const { useGetMasterSubChildDataMutation } = masterSubChildDataApi
