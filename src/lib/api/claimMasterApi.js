import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithCustomHeaders } from '../baseQuery';
import { AesCipher, IsEmpty } from '../../utility/handler';

export const claimMasterApi = createApi({
    reducerPath: 'claimMasterApi',
    baseQuery: baseQueryWithCustomHeaders(),
    endpoints: (builder) => ({
        getClaimsStatusMaster: builder.mutation({
            query: ({ encryptData }) => ({
                url: `claimsMasterMiddleLayer/v1/getClaimsStatusMaster`,
                method: 'POST',
                body: { encryptData },
            }),
            transformResponse: (response) => {
                if (!IsEmpty(response?.data)) {
                    const decryptedData = AesCipher.decrypt(response?.data);
                    response.data = JSON.parse(decryptedData)
                }

                return { ...response };
            },
        }),
        addClaimsStatusMaster: builder.mutation({
            query: ({ encryptData }) => ({
                url: `claimsMasterMiddleLayer/v1/insertClaimsStatusMaster`,
                method: 'POST',
                body: { encryptData },
            }),
            transformResponse: (response) => {
                if (!IsEmpty(response?.data)) {
                    const decryptedData = AesCipher.decrypt(response?.data);
                    response.data = JSON.parse(decryptedData)
                }

                return { ...response };
            },
        }),
    }),
});

export const {
    useGetClaimsStatusMasterMutation,
    useAddClaimsStatusMasterMutation,
} = claimMasterApi
