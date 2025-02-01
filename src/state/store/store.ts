import { configureStore } from "@reduxjs/toolkit";
import { productApi, productReducer } from "../features/products";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
