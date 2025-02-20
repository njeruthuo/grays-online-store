import { BASE_URL } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (values) => ({
        url: "user/user_api_view/?key=sign-in",
        method: "post",
        body: values,
      }),
    }),

    signUp: builder.mutation({
      query: (values) => ({
        url: "user/user_api_view/?key=sign-up",
        method: "post",
        body: values,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
