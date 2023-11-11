import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import pages
import Home from "../pages/Home";
import SingleCountry from "../pages/SingleCountry";
import Region from "../pages/Region"

const AnimatedRoutes = () => {

    // can now be access because this component is inside the Router component
    const location = useLocation();

  return (
    // Waits for all animations to complete before unmounting component - resolves Home from loading lower on screen and then moving up
    <AnimatePresence mode="wait">
      {/* AnimatePresence needs a unique key to know when the page have changed */}
        <Routes location={location} key={location.pathname} >
          <Route path="/" element={<Home />} />
          {/* " : " used to create a route param */}
          <Route path="/country/:name" element={<SingleCountry />} />
          <Route path="region/:region" element={<Region />} />
        </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
