import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithCustomHeaders } from '../baseQuery';
import { AesCipher, IsEmpty } from '../../utility/handler';

export const addGeneralApi = createApi({
    reducerPath: 'addGeneralApi',
    baseQuery: baseQueryWithCustomHeaders(),
    endpoints: (builder) => ({
        addState: builder.mutation({
            query: ({encryptData}) => ({
                url: `cbaNewEncrypt/cbaNew/v1/insertGeneralCode`,
                method: 'POST',
                body: {encryptData},
            }),
            transformResponse: (response) => {
                if (!IsEmpty(response?.data)) {
                    const decryptedData = AesCipher.decrypt(response?.data);
                    response.data = JSON.parse(decryptedData)
                }
                
                return { ...response};
              },
        }),
    }),
});

export const { useAddStateMutation } = addGeneralApi
