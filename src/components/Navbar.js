import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = (props) => {
  let navigate = useNavigate();

  const regions = [
    {
      name: "All",
    },
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Americas",
    },
    {
      name: "Oceania",
    },
    {
      name: "Antarctic",
    },
  ];

  // Event
  const handleInputChange = (e) => {
    // Navigates to home
    navigate("/");

    props.onHandleChange(e);
  };

  // Function needed to handle item select, send to App.js
  const handleFilterRegion = (e) => {
    // Navigates to home
    navigate("/");
    // console.log(e);
    props.onFilterRegion(e);
  };

  return (
    <>
      <NavbarBS>
        <NavbarBS.Brand>Where in the world?</NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBS.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <NavDropdown title="Regions" id="basic-nav-dropdown">
              {regions.map((region, i) => (
                <NavDropdown.Item key={i} value={region.name}>
                  <Link to={`/region/${region.name}`} >{region.name}</Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </NavbarBS.Collapse>
      </NavbarBS>

      {/* <h2>
        <Link to="/">Home</Link>
      </h2> */}

      {/* <Form.Label>Search</Form.Label> */}
      <Form.Control
        placeholder="Search..."
        type="text"
        onChange={handleInputChange}
        value={props.searchTerm}
        name="search"
      />

      <Form.Select onChange={handleFilterRegion} value={regions.name}>
        <option key={1}>Filter by Region</option>

        {regions.map((region, i) => (
          <option key={i + 1} value={region.name} eventKey={region.name}>
            {region.name}
          </option>
        ))}
      </Form.Select>

      {/* <Dropdown
        onSubmit={handleFilterRegion}
        onChange={handleFilterRegion}
        value={regions.name}
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter by Region
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {regions.map((region, i) => (
            <Dropdown.Item key={i} value={region.name.toLowerCase()}>
              {region.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> */}
    </>
  );
};

export default Navbar;
