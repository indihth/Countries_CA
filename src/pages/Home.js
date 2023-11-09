import { useState, useEffect } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import CountryCard from "../components/CountryCard";

const COUNTRIES_URL = "https://restcountries.com/v3.1";

const Home = (props) => {
  // Emptry array by default
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countriesRegionList, setCountriesRegionList] = useState([]);

  // Blank search term by default
  // const [term, setTerm] = useState("");

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

  // set Country Search to use filteredCountries list to restrict to filtered
  // But how to reset list if search term is removed, live typing search
  useEffect(() => {
    if (props.searchTerm < 3) {
      // Doesn't start showing filtered countries until 3 characters inputted
      // setFilteredCountries(countriesList);
      // setFilteredCountries(countriesList);
      filterRegions();
    } else {
      let filter = filteredCountries.filter((country) => {
        // name of country and search term to lower case before filter
        return country.name.common
          .toLowerCase()
          .includes(props.searchTerm.toLowerCase());
      });
      setFilteredCountries(filter);
    }

    // Dependencies - runs useEffect when the searchTerm changes
  }, [countriesList, props.searchTerm]);

  useEffect(() => {
    filterRegions();
    // }, []);
  }, [countriesList, props.filterRegion]);

  const filterRegions = () => {
    if (props.filterRegion === "All" || props.filterRegion === "") {
      setFilteredCountries(countriesList);
    } else {
      let filter = countriesList.filter((country) => {
        return country.region === props.filterRegion;
      });
      setFilteredCountries(filter);
    }
  };

  // Impliment sorting - asc/desc,

  let countryCards = filteredCountries.map((country, i) => {
    return (
      // <Col className="mx-auto">
      <CountryCard
        key={i}
        flag={country.flags.svg}
        name={country.name.common}
        region={country.region}
        alt={country.flags.alt}
        capital={country.capital}
        population={country.population}
      />
      // </Col>
    );
  });

  return (
    <>
      {/* <Row className="g-4 mb-5" md={3} xs={1}>
        <Col>
          <input
            type="text"
            value={term}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <Button variant="primary" onClick={handleClick}>
            Search
          </Button>
        </Col>
        <Col>
          <Filter className="mb-3" />
        </Col>
      </Row> */}
      <Row className="g-4 justify-contend-start" md={3} xs={1}>
        {countryCards}
      </Row>
    </>
  );
};

export default Home;
