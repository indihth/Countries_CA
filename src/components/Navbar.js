import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap/";
// import {  } from "react-router-dom";

// Import JSON
import regions from "../assets/regions.json";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Container className="nav-search-container my-3">
      {/* Links to Home page */}
      <Link
        className="h1 d-flex justify-content-center"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Where in the world?
      </Link>
      <Nav variant="underline" className=" d-flex justify-content-center">
        {/* Skips 'All' from regions.json */}
        {regions.slice(1).map((region, i) => (
          <Nav.Item
            key={i}
            value={region.name}
            onClick={() => {
              // Use the navigate function to navigate programmatically
              navigate(`/region/${region.name}`);
            }}
          >
            <Nav.Link className="text-dark">{region.name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Container>
  );
};

export default Navbar;
