import Heading from "@components/common/heading/Heading"
import Input from "@components/form/input/Input";
import { useLogin } from "@hooks/useLogin";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { Navigate } from "react-router-dom";



const LoginPage = () => {
const {accessToken , searchParams ,handleSubmit , submitForm , errors,
  register , emailAvaliabilityStatus ,loading , error} = useLogin();

if (accessToken) {

  return   <Navigate to={"/"}/>
}
  return (
<Row  className="justify-content-center">
  <Col xs={12} md={6}>
  <Heading title="Login"/>

  {searchParams.get("message") === "account_created"  &&   
  
  <Alert variant="success">Your account successfully created, please login</Alert>
  }
  {searchParams.get("message") === "login_required"  &&   
  
  <Alert variant="danger">Login first then access this page</Alert>
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