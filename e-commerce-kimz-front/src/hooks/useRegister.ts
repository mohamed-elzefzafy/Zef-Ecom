import { useNavigate  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import useCheckEmailAvaliability from "./useCheckEmailAvaliability";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterInputs } from "@validations/registerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { actAuthRegister, resetUi } from "src/redux/auth/authSlice";
import { FocusEvent, useEffect } from "react";


export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {loading , error , accessToken} = useAppSelector(state => state.auth)
  const {checkEmailAvaliability , enterdEmail ,emailAvaliabilityStatus , resetCheckEmailAvaliability} 
  = useCheckEmailAvaliability()
  const {register , handleSubmit , trigger , getFieldState , formState : {errors}} = 
  useForm<TRegisterInputs>({mode : "onBlur" , resolver : zodResolver(registerSchema)});

  const submitForm : SubmitHandler<TRegisterInputs> = (data) => {
const {firstName , lastName ,email ,password} = data;
dispatch(actAuthRegister({firstName , lastName ,email ,password}))
.unwrap().then(() => navigate("/login?message=account_created"));


  }

  const emailOnBlurHandler = async(e : FocusEvent<HTMLInputElement>) =>{
await  trigger("email");
const value = e.target.value;
    const {isDirty , invalid} = getFieldState("email");
    console.log(isDirty , invalid);
    if (isDirty && !invalid && enterdEmail !== value) { 
      checkEmailAvaliability(value);
    }

    if ( isDirty && invalid && enterdEmail ) {
      resetCheckEmailAvaliability();
    }
    
  }

  useEffect(() =>{
    return () => {
      dispatch(resetUi());
    }
   },[dispatch]);

return {accessToken , handleSubmit , submitForm , errors , register,
  emailAvaliabilityStatus,emailOnBlurHandler,loading,error}
}