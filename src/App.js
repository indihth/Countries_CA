import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
// Import pages
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";


function App() {

  return (
    <Router>
      <Container className="mx-auto homeContainer">
          <Navbar className="mb-3"/>
          {/* useLocation() can only be accessed from a component WITHIN Router, routes in own component solves this */}
           <AnimatedRoutes/>
      </Container>
    </Router>
  );
}

export default App;
