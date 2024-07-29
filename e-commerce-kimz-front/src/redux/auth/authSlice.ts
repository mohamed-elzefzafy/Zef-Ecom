import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/shared";
import actAuthRegister from "./act/actAuthRegister";
import { isString } from "src/types/guards";
import actAuthLogin from './act/actAuthLogin';


export interface IAuthState {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}
const initialState :IAuthState = {
  user: null,
  accessToken: null,
loading : "idle",
error : null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers : {
    resetUi : (state) => {
      state.loading = "idle";
      state.error = null;
    }
  },
extraReducers(builder) {
  // register 
  builder.addCase(actAuthRegister.pending , (state) => {
    state.loading = "pending";
    state.error = null
  });
  builder.addCase(actAuthRegister.fulfilled , (state) => {
    state.loading = "succeeded";
  });
  builder.addCase(actAuthRegister.rejected , (state , action) => {
    if (isString(action.payload)) {
      state.error = action.payload
    }
  });
  
    // login 
    builder.addCase(actAuthLogin.pending , (state) => {
      state.loading = "pending";
      state.error = null
    });
    builder.addCase(actAuthLogin.fulfilled , (state , action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected , (state , action) => {
      if (isString(action.payload)) {
        state.error = action.payload
      }
    });
},
})

export {actAuthRegister , actAuthLogin};
export const {resetUi} = authSlice.actions;
export default authSlice.reducer;