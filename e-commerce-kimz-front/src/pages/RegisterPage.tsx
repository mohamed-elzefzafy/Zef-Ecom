import Heading from "@components/common/heading/Heading"
import Input from "@components/form/input/Input"
import { useRegister } from "@hooks/useRegister"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { Navigate } from "react-router-dom"





const RegisterPage = () => {
const {accessToken , handleSubmit , submitForm , errors , register,
  emailAvaliabilityStatus,emailOnBlurHandler,loading,error} = useRegister();

  if (accessToken) {

    return   <Navigate to={"/"}/>
  }
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