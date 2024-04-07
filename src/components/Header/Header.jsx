import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import "./Header.css"


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userRdxData = useSelector(userData)

  const token = userRdxData.credentials.token
  const decoded = userRdxData.credentials

  const logMeOut = () => {
    dispatch(logout({credentials: {}}))
    setTimeout(() => {
      navigate("/");
    });
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="/">NutriFit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="nutritionists">Nutricionistas</Nav.Link>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">Resgistrarse</NavDropdown.Item>
                </>
              ) : decoded.userData.roles?.some(roles => roles.name === "admin") ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="admin">Administrador Perfiles</NavDropdown.Item>
                  <NavDropdown.Item href="Allappointments">Citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Cerrar sesión</NavDropdown.Item>
                </>
              ) : decoded.userData.roles?.some(roles => roles.name === "nutritionist") ? (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="myappointmentsNutritionists">Mis citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Cerrar sesión</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="newappointments">Crear citas</NavDropdown.Item>
                  <NavDropdown.Item href="myappointments">Mis citas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logMeOut()}>Cerrar sesión</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
