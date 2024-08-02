import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HeaderLeftBar from "./headerLeftBar/HeaderLeftBar";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { logoutAction } from "src/redux/auth/authSlice";
import { useEffect } from "react";
import { actGetWishlist, productWithListCleanUp } from "src/redux/wishlist/wishlistSlice";


const { headerContainer, headerLogo } = styles;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
const {user , accessToken} = useAppSelector(state => state.auth);
console.log(user?.firstName);
const handleLogout = () => {
  dispatch(logoutAction());
  navigate("/");
}

  useEffect(()=>{
    if (accessToken) {
      dispatch(actGetWishlist("productIds"));
    }
  },[dispatch , accessToken]);
  
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

{accessToken ?

(
  <NavDropdown title={`Welcome : ${user?.firstName}  ${user?.lastName}`} id="basic-nav-dropdown">
<NavDropdown.Item to="/profile" as={NavLink} end>Profile</NavDropdown.Item>
<NavDropdown.Item to="/profile/orders" as={NavLink}>Orders</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item
onClick={handleLogout}
>
  Logout</NavDropdown.Item>
</NavDropdown>

)
:
(
  <>
  <Nav.Link as={NavLink} to={"/login"}>
    Login
  </Nav.Link>
  <Nav.Link as={NavLink} to="/register">
    Register
  </Nav.Link>
  </>
)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
