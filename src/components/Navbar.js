import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarBS from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import {  } from "react-router-dom";

// Import JSON
import regions from "../assets/regions.json";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarBS>
      <NavbarBS.Brand>
        {/* Replaced Link with 'navigate()' - conflicts w/ Bootstrap components also using <a>*/}
        <Nav.Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Where in the world?
        </Nav.Link>
      </NavbarBS.Brand>
      <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBS.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Regions" id="basic-nav-dropdown">
            {/* Skips 'All' from regions.json */}
            {regions.slice(1).map((region, i) => (
              <NavDropdown.Item
                key={i}
                value={region.name}
                onClick={() => {
                  // Use the navigate function to navigate programmatically
                  navigate(`/region/${region.name}`);
                }}
              >
                {region.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </NavbarBS.Collapse>
    </NavbarBS>
  );
};

export default Navbar;
