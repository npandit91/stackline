import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getProductData from "../stubbed-api";

import { RootState } from "../types/App";
import { ProductDetailsState } from "./types";

// Thunk
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId: string) => {
    const response = await getProductData(productId);
    return response.data;
  }
);

const initialState: ProductDetailsState = {
  loading: false,
  data: undefined,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product details";
      });
  },
});

// Selectors
export const selectSalesData = (state: RootState) => state.product.data?.sales;
export const selectProductInfo = (state: RootState) => ({
  error: state.product.error,
  image: state.product.data?.image,
  loading: state.product.loading,
  subtitle: state.product.data?.subtitle,
  tags: state.product.data?.tags,
  title: state.product.data?.title,
});

// Reducer
export default productSlice.reducer;
