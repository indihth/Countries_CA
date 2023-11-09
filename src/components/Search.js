import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// Import JSON
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
    <>
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
          <option key={i + 1} value={region.name} eventkey={region.name}>
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

export default Search;
