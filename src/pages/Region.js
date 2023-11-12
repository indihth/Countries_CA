import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Spinner } from "react-bootstrap";

// Import components
import AnimatedPage from "../components/AnimatedPage";
import AnimatedCard from "../components/AnimatedCard";
import CountryCard from "../components/CountryCard";

/////////////////////////////
// Page identical to Home except for search and filter functionality
/////////////////////////////

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
