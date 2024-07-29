import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/redux/store";
import request from "@services/request";
import { TProduct } from "src/types/product";
import axios from "axios";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";

export type TResponse =  TProduct[];

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByAction" , async(_,thunkApi) => {
const {rejectWithValue , fulfillWithValue , getState , signal} = thunkApi;
const {cart} = getState() as RootState;
const itemsId = Object.keys(cart.items);

if (!itemsId.length) {
return fulfillWithValue([]);
}

try {
  const concatenetedItemsIds = itemsId.map(itemId => `id=${itemId}`).join("&");
console.log(concatenetedItemsIds);
  const response = await request.get<TResponse>(`/products?${concatenetedItemsIds}` , {signal});
  return response.data;
} catch (error) {
return rejectWithValue(AxiosErrorHandler(error));
    
}
})



export default actGetProductsByItems;