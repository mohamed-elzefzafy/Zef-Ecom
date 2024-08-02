import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";
import { RootState } from "src/redux/store";
import { TOrderItem } from "src/types/orders";

type TResponse = TOrderItem[];
const actGetOrders = createAsyncThunk("orders/actGetOrders" , async(_,thunkApi) => {
  const {rejectWithValue , getState , signal} =thunkApi;
  const {auth} = getState() as RootState;
  try {
    const res = await request.get<TResponse>(`/orders?userId=${auth.user?.id}` , {signal});
    return res.data;
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }

})




export default actGetOrders;