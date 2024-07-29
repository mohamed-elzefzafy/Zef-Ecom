import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";


type TFormData = {
  email : string;
  password : string;
}
type TResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};

const actAuthLogin = createAsyncThunk("auth/actAuthLogin" , async(formData : TFormData , thunkApi) => {
  const {rejectWithValue} = thunkApi;

  try {
    const res = await request.post("/login" , formData);
    return res.data;
  } catch (error) {
    return rejectWithValue(AxiosErrorHandler(error));
  }

})



export default actAuthLogin;