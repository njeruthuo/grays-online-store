import { createSlice } from "@reduxjs/toolkit";

import { productApi } from "./productApi";
import { ProductState } from "@/types/products";
import { RootState } from "@/state/store/store";

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.fetchProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload;
      }
    );
  },
});

export default productSlice.reducer;

export const productList = (state: RootState) => state.productReducer.products;
