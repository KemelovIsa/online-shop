import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REQUEST_URL } from '../../utils/constants/constants';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = loginApi;
