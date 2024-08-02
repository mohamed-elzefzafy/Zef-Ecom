import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";


const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle" , async(id : number, thunkApi) => {
const {rejectWithValue} = thunkApi;
  try {
    const isRecordExist = await request.get(`/wishlist?userId=1&productId=${id}`);
    if (isRecordExist.data.length > 0) {
       await request.delete(`/wishlist/${isRecordExist.data[0].id}`);
       return {type : "remove" , id};
    }else {
      await request.post(`/wishlist` , {userId : "1" , productId : id});
      return {type : "add" , id};
    }
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
      
  }

})


export default actLikeToggle;