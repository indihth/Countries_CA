import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import{ Col, Nav, NavDropdown, Dropdown }from "react-bootstrap/";
import NavbarBS from "react-bootstrap/Navbar";

// Import JSON - cleaner code and easier to maintain in seperate document. Allows for later changes
import regions from "../assets/regions.json";

const Search = (props) => {

  let navigate = useNavigate();

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
    <Container className="nav-search-container d-flex mb-5">
      {/* Search bar */}
      <Col xs={8} className="me-2">
        <Form.Control
          placeholder="Search..."
          type="text"
          onChange={handleInputChange}
          value={props.searchTerm}
          name="search"
        />
      </Col>

      {/* Region filter */}
      <Col xs={4}>
        <Form.Select onChange={handleFilterRegion} value={regions.name}>
          <option key={1}>Filter by Region</option>
          {regions.map((region, i) => (
            <option key={i + 1} value={region.name} eventkey={region.name}>
              {region.name}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Container>
  );
};

export default Search;
