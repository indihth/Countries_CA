import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// Import pages
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";


function App() {

  return (
    <Router>
      <Container className="mx-auto">
        <Row>
          <Col>
          <Navbar/>
          {/* useLocation() can only be accessed from a component WITHIN Router, routes in own component solves this */}
           <AnimatedRoutes/>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
