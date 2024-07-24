import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "../../types/shared";
import actGetProductsByCatPrefix, { TResponse } from "./act/actGetProductsByCatPrefix";
import { TProduct } from "src/types/product";





export interface ICategories {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategories = {
  records: [],
  loading: "idle",
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productCleanUp : (state) => {
      state.records = [];
    }
  },
  extraReducers : (builder) => {
    builder.addCase(actGetProductsByCatPrefix.pending , (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled , (state , action ) => {
      state.loading = "succeeded";
      state.records = action.payload as TResponse;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected , (state , action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    
  }
});

export const {productCleanUp} = productsSlice.actions;
export {actGetProductsByCatPrefix}
export default productsSlice.reducer;
