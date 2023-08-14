import { ILogin, IRegister } from '@/interface/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    endpoints: (builder) => ({
        register: builder.mutation<{ message: string, accessToken: string, user: {} }, IRegister>({
            query: (credentials) => ({
                url: `/register`,
                method: "POST",
                body: credentials
            }),
        }),
        login: builder.mutation<{ message: string, accessToken: string, user: {} }, ILogin>({
            query: (credentials) => ({
                url: `/login`,
                method: "POST",
                body: credentials
            }),
        })
    })

})


export const { useLoginMutation, useRegisterMutation } = authApi;
export default authApi;