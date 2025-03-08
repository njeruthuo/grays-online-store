import { BASE_URL } from "@/constants/constant";
import { IBrands, ICategories, IProduct } from "@/types/products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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

    fetchBrandList: builder.query<IBrands[], null>({
      query: () => "catalogue/brand_api_view/",
      providesTags: ["Categories"],
    }),

    addProduct: builder.mutation({
      query: (arg) => ({
        url: "catalogue/product_api_view/",
        method: "post",
        body: arg,
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchCategoryListQuery,
  useFetchBrandListQuery,
  useAddProductMutation,
} = productApi;
