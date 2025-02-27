import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "src/types/product";
import actGetProductsByItems from './act/actGetProductsByItems';
import { TLoading } from "src/types/shared";
import { isString } from "src/types/guards";



export interface ICartState {
  items : {[key: string]: number},
  productsFullInfo : TProduct[],
  loading : TLoading,
  error : null | string,
}

const initialState : ICartState = {
  items : {},
  productsFullInfo : [],
  loading : "idle",
  error  :null
}
const cartslice = createSlice({
  name : "cart",
  initialState,
  reducers: {
    addToCart : (state , action) => {
      
      const id = action.payload
      if (state.items[id])
      {
        state.items[id]++;
      }  else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity : (state , action) => {
  state.items[action.payload.id] = action.payload.quantity;
    },
    removeCartElementAction : (state , action) => {
    delete state.items[action.payload];
    state.productsFullInfo = state.productsFullInfo.filter(item => item.id !== action.payload);
    },
    productsCartCleanUp : (state) => {
      state.productsFullInfo = [];
    }, 
    clearCartItems : (state) => {
      state.items = {};
      state.productsFullInfo =[];
    },
    resetCartStatus : (state) => {
      state.loading = "idle";
      state.error =null;
    }
  },
  extraReducers : (builder) => {
    builder.addCase(actGetProductsByItems.pending , (state) => {
      state.loading = "pending";
      state.error = null
    });
    builder.addCase(actGetProductsByItems.fulfilled , (state , action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected , (state , action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  }
})


export {actGetProductsByItems}
export const {addToCart , cartItemChangeQuantity , removeCartElementAction , 
  productsCartCleanUp , clearCartItems , resetCartStatus} = cartslice.actions;
export default cartslice.reducer;