import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from './act/actLikeToggle';
import { TLoading } from "src/types/shared";
import actGetWishlist from './act/actGetWishlist';
import { TProduct } from "src/types/product";
import { isString } from "src/types/guards";
import { logoutAction } from "../auth/authSlice";
 
export interface IWishlist {
  itemsId : number[];
  productsFullInfo : TProduct[],
  error : null | string;
  loading : TLoading;
}
const initialState : IWishlist ={
itemsId : [],
productsFullInfo : [],
error : null,
loading : "idle",
}
const wishlistSlice = createSlice({
  name : 'wishlist',
  initialState,
  reducers : {
    productWithListCleanUp : (state) => {
      state.productsFullInfo = [];
    }
  },
  extraReducers : (builder) => {
    builder.addCase(actLikeToggle.pending , (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled , (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId?.push(action.payload.id);
      } else {
      state.itemsId = state.itemsId.filter(item => item !== action.payload.id);
      state.productsFullInfo = state.productsFullInfo.filter(item => item.id !== action.payload.id);
      }
    });
    builder.addCase(actLikeToggle.rejected , (state , action) => {
      if (isString(action.payload)) {
        state.error = action.payload
      }
    });
    // get wishlist 

    builder.addCase(actGetWishlist.pending , (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled , (state, action) => {
      state.loading = "succeeded";
  if(action.payload.dataType === "productIds") {
     state.itemsId = action.payload.data as number[];
  } else {
    state.productsFullInfo = action.payload.data as TProduct[];
  }});
    builder.addCase(actGetWishlist.rejected , (state , action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload
      }
    });

builder.addCase(logoutAction , state => {
  state.productsFullInfo = [];
  state.itemsId = [];
})
  }
})

export {actLikeToggle , actGetWishlist};
export const {productWithListCleanUp} = wishlistSlice.actions;
export default wishlistSlice.reducer;