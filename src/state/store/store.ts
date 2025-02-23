import { configureStore } from "@reduxjs/toolkit";
import { productApi, productReducer } from "../features/products";
import { authApi, authReducer } from "../features/auth";
import { orderApi } from "../features/orders";

export const store = configureStore({
  reducer: {
    // Products
    productReducer: productReducer,
    [productApi.reducerPath]: productApi.reducer,

    // Orders
    [orderApi.reducerPath]: orderApi.reducer,

    // Auth
    authReducer: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      orderApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
