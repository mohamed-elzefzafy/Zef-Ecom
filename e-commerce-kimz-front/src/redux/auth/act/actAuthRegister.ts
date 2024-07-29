import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "@services/request";
import AxiosErrorHandler from "@utils/isAxiosErrorHandler";


type TFormData = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
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
const actAuthRegister = createAsyncThunk("auth/actAuthRegister", async(formData : TFormData , thunk) => {
const {rejectWithValue} = thunk;

try {
  const res = await request.post<TResponse>("/register" , formData);
  return res.data;
} catch (error) {
  return rejectWithValue(AxiosErrorHandler(error));
}
});


export default actAuthRegister;