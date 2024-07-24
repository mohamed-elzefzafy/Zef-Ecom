import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import axios from "axios";
import { TCategory } from "src/types/category";

export type TResponse =  TCategory[];

const actGetCategories = createAsyncThunk("categories/actGetCategories" , async(_, thunkApi) => {
const {rejectWithValue , signal} = thunkApi;
try {
  const response = await request.get<TResponse>("/category" , {signal});
  return response.data;

} catch (error) {
if (axios.isAxiosError(error)) {
  return  rejectWithValue(error.response?.data.message || error.message);
}
  
}
})


export default actGetCategories;