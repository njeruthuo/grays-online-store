import { BASE_URL } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (values) => ({
        url: "stk-push/",
        method: "post",
        body: values,
      }),
    }),
  }),
});

export const { useCheckoutMutation } = checkoutApi;
