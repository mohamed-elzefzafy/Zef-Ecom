import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";
import { TProduct } from "src/types/product";

export type TResponse =  TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk("products/actGetProductsByCatPrefix" , async(prefix : string, thunkApi) => {
const {rejectWithValue , signal} = thunkApi;
try {
  const response = await request.get<TResponse>(`/products?cat_prefix=${prefix}` , {signal});
  return response.data;

} catch (error) {

  return rejectWithValue(AxiosErrorHandler(error));
}
})


export default actGetProductsByCatPrefix;