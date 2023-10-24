import React, { Fragment } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";
import Themes from '../Pages/Themes';

const NavbarC = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const isLoggedIn = !!token;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth", { replace: true });
  };

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Email client
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto">
              {isLoggedIn && (
                <Nav.Link as={NavLink}  to="/">
                  Home
                </Nav.Link>
              )}
            </Nav> */}
            <Nav>
              {!isLoggedIn && (
                <Nav.Link as={NavLink} to="/auth">
                  Login
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Button variant="outline-danger" onClick={logoutHandler}>
                  Logout
                </Button>
              )}
            </Nav>
            <Nav>
              {/* {<Themes/>} */}
              <Themes/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavbarC;
