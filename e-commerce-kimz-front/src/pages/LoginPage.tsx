import Heading from "@components/common/heading/Heading"
import Input from "@components/form/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvaliability from "@hooks/useCheckEmailAvaliability";
import { loginSchema, TLoginInputs } from "@validations/loginSchema";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { actAuthLogin, resetUi } from "src/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams , setSearchParams] = useSearchParams();
  const {checkEmailAvaliability , enterdEmail ,emailAvaliabilityStatus , resetCheckEmailAvaliability} 
  = useCheckEmailAvaliability()



  const {loading , error} = useAppSelector(state => state.auth)
  const {register , handleSubmit , formState : {errors}} = 
  useForm<TLoginInputs>({mode : "onBlur" , resolver : zodResolver(loginSchema)});

  const submitForm : SubmitHandler<TLoginInputs> = (data) => {
    if (searchParams.get("message") === "account_created" ) navigate("/login");
    const {email , password} = data;
  dispatch(actAuthLogin({email , password})).unwrap().then(() => navigate("/"));
  }

  useEffect(() =>{
    return () => {
      dispatch(resetUi());
    }
   },[dispatch]);
  return (
<Row  className="justify-content-center">
  <Col xs={12} md={6}>
  <Heading title="Login"/>

  {searchParams.get("message") === "account_created"  &&   
  
  <Alert variant="success">Your account successfully created, please login</Alert>
  }
  <Form onSubmit={handleSubmit(submitForm)}>

  <Input error={errors.email?.message as string}
 label={"Email address"} name={"email"} register={register} />
    
    

        
<Input error={errors.password?.message as string}
 label={"Password"} name={"password"} register={register} type={"password"}/>

  
<Button variant="info" type="submit" className="text-white mt-3"
disabled={emailAvaliabilityStatus === "checking" ? true : false || loading === "pending"}>
{loading === "pending" ? <Spinner size="sm"/> : "Submit"}
      </Button>
      {error && <p style={{color : "3DC3534" , marginTop : "10px"}}>{error}</p>}
    </Form>
  </Col>
</Row>
  )
}

export default LoginPage;