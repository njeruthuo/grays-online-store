import { configureStore } from "@reduxjs/toolkit";
import { productApi, productReducer } from "../features/products";
import { authApi, authReducer } from "../features/auth";

export const store = configureStore({
  reducer: {
    // Products
    productReducer: productReducer,
    [productApi.reducerPath]: productApi.reducer,

    // Auth
    authReducer: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
