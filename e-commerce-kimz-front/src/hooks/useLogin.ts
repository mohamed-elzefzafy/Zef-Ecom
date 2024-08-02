import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvaliability from "@hooks/useCheckEmailAvaliability";
import { loginSchema, TLoginInputs } from "@validations/loginSchema";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { actAuthLogin, resetUi } from "src/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";


export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams , setSearchParams] = useSearchParams();
  const {emailAvaliabilityStatus } = useCheckEmailAvaliability()



  const {loading , error , accessToken} = useAppSelector(state => state.auth)
  const {register , handleSubmit , formState : {errors}} = 
  useForm<TLoginInputs>({mode : "onBlur" , resolver : zodResolver(loginSchema)});

  const submitForm : SubmitHandler<TLoginInputs> = async(data) => {
    searchParams.get("message") ? setSearchParams("") : false;
    const {email , password} = data;
  dispatch(actAuthLogin({email , password})).unwrap().then(() => navigate("/"));
  }

  useEffect(() =>{
    return () => {
      dispatch(resetUi());
    }
   },[dispatch]);


   return {accessToken , searchParams ,handleSubmit , submitForm , errors,
    register , emailAvaliabilityStatus ,loading , error}
}