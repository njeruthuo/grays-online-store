import { BASE_URL } from "@/constants/constant";
import { IBrands, ICategories, IProduct, IResponseType } from "@/types/products";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Products", "Categories", "Brand"],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IResponseType, string>({
      query: () => `catalogue/product_api_view/`,
      providesTags: ["Products"],
    }),

    fetchCategoryList: builder.query<ICategories[], null>({
      query: () => "catalogue/category_api_view/",
      providesTags: ["Categories"],
    }),

    fetchBrandList: builder.query<IBrands[], null>({
      query: () => "catalogue/brand_api_view/",
      providesTags: ["Brand"],
    }),

    filterSearchBar: builder.query<IResponseType, string>({
      query: (arg) => `catalogue/product_api_view/${arg}`,
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (arg) => ({
        url: "catalogue/product_api_view/",
        method: "post",
        body: arg,
      }),
    }),

    getProductDetails: builder.query<IProduct, number>({
      query: (id) => `catalogue/product_api_view/?id=${id}`,
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchCategoryListQuery,
  useFetchBrandListQuery,
  useAddProductMutation,
  useFilterSearchBarQuery,
  useGetProductDetailsQuery,
} = productApi;
