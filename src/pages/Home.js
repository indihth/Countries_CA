import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Spinner } from "react-bootstrap";

// Import Components
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import AnimatedPage from "../components/AnimatedPage";
import AnimatedCard from "../components/AnimatedCard";

const Home = (props) => {
  // Emptry array by default
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

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
    // Doesn't start showing filtered countries until 3 characters inputted
    if (searchTerm < 3) {
      filterRegions();
    } else {
      // Filters array and compares the starting characters to search term
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
    // Filters regions whenever the filterRegion state is changed
    filterRegions();
  }, [countriesList, filterRegion]);

  const filterRegions = () => {
    // If region is set to all or is blank by default, keep showing all countries
    if (filterRegion === "All" || filterRegion === "") {
      setFilteredCountries(countriesList);
    } else {
      // Filters all countries by the filterRegion state and put into new variable
      let filter = countriesList.filter((country) => {
        return country.region === filterRegion;
      });
      // Sets filteredCountries to the filter variable
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

  // Create variable to hold all countries, passes values as props to the CountryCard
  const countryCards = filteredCountries ? (
    filteredCountries.map((country, i) => {
      return (
        // Wrap card in component for animation
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
      <Container>
      {/* Passing down function as prop to Search */}
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
