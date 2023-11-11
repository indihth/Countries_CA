import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Spinner } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { motion } from "framer-motion";

// Import Components
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import AnimatedPage from "../components/AnimatedPage";
import AnimatedCard from "../components/AnimatedCard";

const COUNTRIES_URL = "https://restcountries.com/v3.1";

const Home = (props) => {
  // Emptry array by default
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countriesRegionList, setCountriesRegionList] = useState([]);

  // set filter region
  const [filterRegion, setFilterRegion] = useState("All");

  // Lifting state up for use in multiple child components
  const [searchTerm, setSearchTerm] = useState("");

  // Gets all countries
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountriesList(response.data);
        setFilteredCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Search
  useEffect(() => {
    if (searchTerm < 3) {
      // Doesn't start showing filtered countries until 3 characters inputted
      filterRegions();
    } else {
      let filter = filteredCountries.filter((country) => {
        // name of country and search term to lower case before filter
        return country.name.common
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase());
      });
      setFilteredCountries(filter);
    }
  }, [countriesList, searchTerm]);

  // Region Search
  useEffect(() => {
    filterRegions();
    // }, []);
  }, [countriesList, filterRegion]);

  const filterRegions = () => {
    if (filterRegion === "All" || filterRegion === "") {
      setFilteredCountries(countriesList);
    } else {
      let filter = countriesList.filter((country) => {
        return country.region === filterRegion;
      });
      setFilteredCountries(filter);
    }
  };

  // Event
  const onHandleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter Region handler
  const onFilterRegion = (e) => {
    setFilterRegion(e.target.value);
  };

  // Impliment sorting - asc/desc,

  const countryCards = filteredCountries ? (
    filteredCountries.map((country, i) => {
      return (
        <AnimatedCard index={i} key={i} className="">
          <CountryCard
            flag={country.flags.svg}
            name={country.name.common}
            region={country.region}
            alt={country.flags.alt}
            capital={country.capital}
            population={country.population}
          />
        </AnimatedCard>
      );
    })
  ) : (
    <Spinner />
  );

  return (
    // Initial animation and exit props defining fade
    <AnimatedPage>
      {/* Passing down function as prop to nav */}
      <Container>
        <Search
          onHandleChange={onHandleChange}
          searchTerm={searchTerm}
          onFilterRegion={onFilterRegion}
        />
        <Row className="g-4" md={3} xs={1}>
          {countryCards}
        </Row>
      </Container>
    </AnimatedPage>
  );
};

export default Home;
