import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LottieHandler from "@components/feedBack/lottieHandler/LottieHandler";

const ErrorPage = () => {

  return (
<Container className="notFound">
<LottieHandler  type="notFound"/>
<Link to={"/"} replace={true}>Go To Home</Link>
</Container>
  )
}

export default ErrorPage;

