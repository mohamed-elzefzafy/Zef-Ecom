import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import Header from "@components/common/Header/Header";
import Footer from "@components/common/footer/Footer";
import { Outlet } from "react-router-dom";


const {container , wrabber} = styles;
const MainLayout = () => {
  return (
  <Container className={container}>
    <Header/>
    <div className={wrabber}>
<Outlet/>
    </div>
    <Footer/>
    </Container>
  )
}

export default MainLayout