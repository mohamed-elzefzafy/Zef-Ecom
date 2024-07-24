import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link, NavLink } from "react-router-dom";
import HeaderLeftBar from "./headerLeftBar/HeaderLeftBar";


const { headerContainer, headerLogo } = styles;
const Header = () => {

  return (
    <header className="">
      <Link to="/" className={headerContainer}>
        <h1 className={headerLogo}>
          {" "}
          <span>Zef</span> <Badge bg="info">Ecom</Badge>{" "}
        </h1>
<HeaderLeftBar/>

      </Link>

      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/Categories"}>
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/about-us"}>
                About us
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/products"}>
                Products
              </Nav.Link>
            </Nav>

            <Nav className="">
              <Nav.Link as={NavLink} to={"/login"}>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
