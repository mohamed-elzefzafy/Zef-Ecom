import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";
import axios from "axios";
import { RootState } from "src/redux/store";
import { TProduct } from 'src/types/product';


export type TResponse = TProduct[];






const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist" , async(_,thunkApi) => {
const {rejectWithValue , fulfillWithValue , signal} = thunkApi;


try {
  const userWishlist = await request.get<{productId : number}[]>(`/wishlist?userId=1` , {signal});

  if (userWishlist.data.length < 1) {
return fulfillWithValue([]);
  }

const concatenetedItemsIds = userWishlist.data.map(el => `id=${el.productId}`).join("&");
const response = await request.get<TResponse>(`/products?${concatenetedItemsIds}`);
return response.data;

} catch (error) {
  return rejectWithValue(AxiosErrorHandler(error));
}


  // const response = await request.get(`/wishlist?`)

})



export default actGetWishlist