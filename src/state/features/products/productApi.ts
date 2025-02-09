import { ICategories, IProduct } from "@/types/products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IProduct[], null>({
      query: () => "catalogue/product_api_view/",
      providesTags: ["Products"],
    }),

    fetchCategoryList: builder.query<ICategories[], null>({
      query: () => "catalogue/category_api_view/",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useFetchProductsQuery,useFetchCategoryListQuery } = productApi;
