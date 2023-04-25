// Header.jsx
// Header for the webpages

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  let token = localStorage.getItem("token");

  return (
    <Navbar bg="white" expand="md">
      <Container>
        <Navbar.Brand>
          <Link className="navbar-brand" to="/">Pocketwatch</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!token && <Link className="nav-link" to="/login">Login</Link>}
            {!token && <Link className="nav-link" to="/register">Register</Link>}
            {token && <Link className="nav-link" to="/settings">Settings</Link>}
            {token && <Link className="nav-link" to="/logout">Logout</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
