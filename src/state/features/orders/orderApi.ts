import { BASE_URL } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderInterface } from ".";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("grayAuthToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    fetchOrders: builder.query<OrderInterface[], "">({
      query: () => "orders/order_api_view/",
      providesTags: ["Orders"],
    }),
  }),
});

export const { useFetchOrdersQuery } = orderApi;
