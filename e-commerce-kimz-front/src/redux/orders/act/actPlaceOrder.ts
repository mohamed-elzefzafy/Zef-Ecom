import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";
import { RootState } from "src/redux/store";



const actPlaceOrder = createAsyncThunk("orders/actPlaceOrder" , async(subtotal : number , thunkApi)=> {
const {rejectWithValue , getState} = thunkApi;
const {auth , cart} = getState() as RootState;

const orderItems = cart.productsFullInfo.map(el => ({
  id : el.id,
  title : el.title,
  price : el.price,
  img : el.img,
  quantity : cart.items[el.id],
}));

try {
  const res = await request.post("/orders" , 
    {
      userId : auth.user?.id,
      items : orderItems,
      subtotal,
    }
  );

  return res.data;

} catch (error) {
  return rejectWithValue(AxiosErrorHandler(error));
}
})



export default actPlaceOrder;