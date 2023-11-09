import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

// import './app.css'

// Import compontents
import Search from './components/Search'

// Import pages
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";
import Region from "./pages/Region"
import Navbar from "./components/Navbar";


function App() {

  return (
    <Router>
      <Container className="mx-auto">
        <Row>
          <Col>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />}  />
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
