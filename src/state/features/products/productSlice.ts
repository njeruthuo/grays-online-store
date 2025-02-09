import { createSlice } from "@reduxjs/toolkit";

import { productApi } from "./productApi";
import { ProductState } from "@/types/products";
import { RootState } from "@/state/store/store";

const initialState: ProductState = {
  products: [],
  cart: [],
  filteredProducts: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if added product is already in the cart.
      const item = state.cart.find(
        (item) => item.product.id == action.payload.id
      );
      if (item) {
        // If the product is already in the cart, increase quantity
        item.quantity += 1;
      } else {
        // If not, add a new product to the cart
        state.cart.push({
          product: {
            ...action.payload,
          },
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.product.id !== id);
    },

    reduceCartQuantity: (state, action) => {
      const { id } = action.payload;

      const itemReduced = state.cart.find((item) => item.product.id == id);

      if (itemReduced) {
        if (itemReduced.quantity <= 1) {
          state.cart = state.cart.filter((item) => item.product.id !== id);
        }
        itemReduced.quantity -= 1;
      }
    },
  },

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

export const { addToCart, removeFromCart, reduceCartQuantity } =
  productSlice.actions;

export const cartItemsList = (state: RootState) => state.productReducer.cart;
export const productList = (state: RootState) => state.productReducer.products;
export const productItemsList = (state: RootState) =>
  state.productReducer.filteredProducts;
