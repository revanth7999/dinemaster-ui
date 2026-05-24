import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBarComponent({ menus, onMenuClick }) {
  return (
    <Navbar expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menus.map((menu) => (
              <Nav.Link
                key={menu.id}
                onClick={() => onMenuClick(menu)}
                style={{
                  cursor: "pointer",
                  color: "#ffff",
                }}
              >
                {menu.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
