import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Spinner } from "react-bootstrap";

// Import components
import AnimatedPage from "../components/AnimatedPage";
import AnimatedCard from "../components/AnimatedCard";
import CountryCard from "../components/CountryCard";

const COUNTRIES_URL = "https://restcountries.com/v3.1";

const Home = (props) => {
  let { region } = useParams();
  // Emptry array by default
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Gets region countries
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .then((response) => {
        setCountriesList(response.data);
        setFilteredCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [countriesList, props.filterRegion]);

  //   useEffect(() => {
  //     if (props.searchTerm < 3) {
  //       // Doesn't start showing filtered countries until 3 characters inputted
  //       setFilteredCountries(countriesList);
  //     } else {
  //       let filter = countriesList.filter((country) => {
  //         // name of country and search term to lower case before filter
  //         return country.name.common
  //           .toLowerCase()
  //           .includes(props.searchTerm.toLowerCase());
  //       });
  //       setFilteredCountries(filter);
  //     }
  //     console.log("search");

  //     // Dependencies - runs useEffect when the searchTerm changes
  //   }, [countriesList, props.searchTerm]);

  // Impliment sorting - asc/desc,

  const countryCards = filteredCountries ? (
   filteredCountries.map((country, i) => {
    return (
      <AnimatedCard index={i}>
        <CountryCard
          key={i}
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
    <AnimatedPage>
      <h2 className="text-center mb-4 pt-3">{region}</h2>
      <Row className="g-4 justify-contend-start" md={3} xs={1}>
        {countryCards}
      </Row>
    </AnimatedPage>
  );
};

export default Home;
