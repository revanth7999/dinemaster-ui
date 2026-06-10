import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBarComponent({ menus, onMenuClick }) {
  const [expanded, setExpanded] = useState(false);

  const handleMenuClick = (menu) => {
    onMenuClick(menu);
    setExpanded(false);
  };

  return (
    <Navbar
      expand="md"
      variant="dark"
      className="p-0bg-transparent"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Navbar.Toggle
        aria-controls="dinemaster-navbar-nav"
        className="border-0 p-1"
      />
      <Navbar.Collapse id="dinemaster-navbar-nav">
        <Nav className="gap-2">
          {menus.map((menu) => (
            <Nav.Link
              key={menu.id || menu.label}
              onClick={() => handleMenuClick(menu)}
              className="dinemaster-nav-link text-white-50 fw-medium px-3 py-2"
            >
              {menu.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarComponent;
