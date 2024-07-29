import Heading from "@components/common/heading/Heading"
import Input from "@components/form/input/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import useCheckEmailAvaliability from "@hooks/useCheckEmailAvaliability"
import { registerSchema, TRegisterInputs } from "@validations/registerSchema"
import { FocusEvent, useEffect } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { actAuthRegister, resetUi } from "src/redux/auth/authSlice"
import { useAppDispatch, useAppSelector } from "src/redux/hooks"




const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {loading , error} = useAppSelector(state => state.auth)
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
  return (
<Row  className="justify-content-center">
  <Col xs={12} md={6}>
  <Heading title="Register"/>
  <Form onSubmit={handleSubmit(submitForm)}>
    
    
<Input error={errors.firstName?.message as string}
 label={"First Name"} name={"firstName"} register={register}/>
    

        
<Input error={errors.lastName?.message as string}
 label={"Last Name"} name={"lastName"} register={register}/>
    
    

        
<Input error={errors.email?.message as string ?errors.email?.message as string : 
emailAvaliabilityStatus === "notAvailable" ?
  "This email is already in use." : emailAvaliabilityStatus === "failed" ? "erroe from server" : ""}
 label={"Email address"} name={"email"} register={register} 
 onBlur={emailOnBlurHandler}
 formText={emailAvaliabilityStatus === "checking" ?
"We're currently checking the availability of this email address. Please wait a moment.": ""
 }
 success={emailAvaliabilityStatus === "available" ? "This email is available for use." : ""}
 disabled={emailAvaliabilityStatus === "checking" ? true : false}
 />
    
    

        
<Input error={errors.password?.message as string}
 label={"Password"} name={"password"} register={register} type={"password"}/>
    
    

        
<Input error={errors.confirmPassword?.message as string}
 label={"Confirm Password"} name={"confirmPassword"} register={register} type={"password"}/>
    
  
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

export default RegisterPage;