import { BASE_URL } from "@/constants/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface FetchProductsArgs {
  page: number;
  searchText: string;
}
// Fetch products with pagination & search
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, searchText }: FetchProductsArgs) => {
    const response = await fetch(
      `${BASE_URL}catalogue/product_api_view/?page=${page}&search=${searchText}`
    );
    return await response.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    page: 1,
    hasMore: true,
    status: "idle",
    searchText: "", // Keep track of search
  },
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.items = action.payload.results; // Replace for new search
        } else {
          // @ts-ignore
          state.items = [...state.items, ...action.payload.results]; // Append for pagination
        }
        state.page += 1;
        state.hasMore = action.payload.next !== null;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
