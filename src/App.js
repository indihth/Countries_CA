import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

// import './app.css'

// Import compontents
import Navbar from './components/Navbar'

// Import pages
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";
import Region from "./pages/Region"


function App() {

  // set filter region
  const [filterRegion, setFilterRegion] = useState("All");

    // Lifting state up for use in multiple child components
    const [searchTerm, setSearchTerm] = useState("");
    // const [region, setRegion] = useState();

    // Event
    const onHandleChange = (e) => {
      setSearchTerm(e.target.value);
    }

    // Filter Region handler
    const onFilterRegion = (e) => {
      setFilterRegion(e.target.value);
      console.log("direct " + e.target.value)
      console.log("state " + filterRegion)
    }

  return (
    <Router>
      <Container className="mx-auto">
        <Row>
          <Col>
            {/* Passing down function as prop to nav */}
            <Navbar onHandleChange={onHandleChange} searchTerm={searchTerm}  onFilterRegion={onFilterRegion} />
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} filterRegion={filterRegion}/>}  />
              {/* " : " used to create a route param */}
              <Route path="/country/:name" element={<SingleCountry />} />
              <Route path="region/:region" element={<Region />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
