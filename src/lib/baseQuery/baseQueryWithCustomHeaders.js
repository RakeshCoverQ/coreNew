import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IsEmpty } from '../../utility/handler';

export const baseQueryWithCustomHeaders = (customHeaders) => fetchBaseQuery({
    baseUrl: 'https://garance.tangerine.insure/cbaNewEncrypt/cbaNew/v1/',
    prepareHeaders: (headers, { getState }) => {
      const {userInfo} = getState()
      headers.set('Content-Type', 'application/json');
      if (!IsEmpty(userInfo?.userData?.SESSION_ID)) {
        headers.set('SessionId', userInfo?.userData?.SESSION_ID);
      }
      return headers;
    },
  });