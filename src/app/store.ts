import { configureStore } from "@reduxjs/toolkit";
import productDetailsReducer from "../product/productSlice";

const store = configureStore({
  reducer: {
    product: productDetailsReducer,
  },
});

export default store;
