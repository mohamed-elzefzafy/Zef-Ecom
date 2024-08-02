import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";
import axios from "axios";
import { RootState } from "src/redux/store";
import { TProduct } from 'src/types/product';

type TDataType = "productIds" | "productsFullInfo";
export type TResponse = TProduct[];






const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist" , async(dataType : TDataType ,thunkApi) => {
const {rejectWithValue , fulfillWithValue , signal , getState} = thunkApi;

const {auth}  = getState() as RootState;
try {
  const userWishlist = await request.get<{productId : number}[]>(`/wishlist?userId=${auth.user?.id}` , {signal});

  if (userWishlist.data.length < 1) {
    return {data : [] , dataType : dataType }
  }

  if (dataType === "productIds") {
    const concatenetedItemsIds = userWishlist.data.map(el =>  el.productId);
    return {data : concatenetedItemsIds , dataType : dataType }
  } else {
    const concatenetedItemsIds = userWishlist.data.map(el => `id=${el.productId}`).join("&");
    const response = await request.get<TResponse>(`/products?${concatenetedItemsIds}`);
    return {data : response.data , dataType : dataType }
  }



} catch (error) {
  return rejectWithValue(AxiosErrorHandler(error));
}


  // const response = await request.get(`/wishlist?`)

})



export default actGetWishlist