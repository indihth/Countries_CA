import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Image, Button } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";


// Import components
import CountryExtra from "../components/CountryExtra";
import AnimatedPage from "../components/AnimatedPage";
import AnimatedCountryInfo from "../components/AnimatedCountryInfo";

// Defind API key
const APIKEY_HOLIDAYS = "rg2HSqaODB5HP3j5hTxL1EZSK5nKrkJf";

const SingleCountry = () => {
  // References the route param from App.js Route
  let { name } = useParams();
  const location = useLocation();

  const [countriesList, setCountriesList] = useState([]);
  const [country, setCountry] = useState("");
  const [holidays, setHolidays] = useState();
  const [isVisible, setIsVisiable] = useState(true);

  // Button to switch between info cards
  let toggle = true;

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        // console.log(response.data);
        setCountriesList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Country specific request isn't needed, can get from all countries
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Optional chaining to safely access nested properties
  const countryCCA2 = country?.cca2?.toLowerCase();

  useEffect(() => {
    // Check if countryCCA2 is defined before making the API call
    if (countryCCA2) {
      axios
        .get(
          `https://calendarific.com/api/v2/holidays?&api_key=${APIKEY_HOLIDAYS}&country=${countryCCA2}&year=2023`
        )
        .then((res) => {
          setHolidays(res.data.response.holidays);
          console.log("holidays request")
        })
        .catch((err) => console.error(err));
    }
  }, [countryCCA2]); // Include countryCCA2 as a dependency to the second useEffect

  if (!country) {
    return <Spinner />;
  }

  const getCurrencies = () => {
    // Change all arrays to useState
    let currencies = [];
    try {
      Object.values(country.currencies).map((currency) => {
        return currencies.push(currency.name);
      });
    } catch {
      return "N/A";
    }
    return currencies.join(", ");
  };

  const getLanguages = () => {
    let languages = [];
    try {
      Object.values(country.languages).map((language) => {
        return languages.push(language);
      });
    } catch {
      return "N/A";
    }
    return languages.join(", ");
  };

  const getBorderCountries = () => {
    const newCountries = [];
    // Check country has borders

    try {
      const borderCountries = country.borders.map((borderCountry, i) => {
        // Loop through each border country
        const country = countriesList.find(
          // Match country code (cca3) to country common name
          (country) => country.cca3 === borderCountry
        );
        return newCountries.push(country.name.common);
      });
    } catch (error) {
      return "None";
    }
    return newCountries.join(", ");
  };

  const countryInfo = country ? (
      <Row className="mb-3">
        <Row>
          <h4 className="mb-3">Country Info</h4>
          <Col>
            <p>
              <b>Official Name:</b> {country.name.official}
            </p>
            <p>
              <b>Region:</b> {country.region}
            </p>
            <p>
              <b>Subregion:</b> {country.subregion}
            </p>
            </Col>
            {/* Returns array of currencies, then display 'name' of first currency in array. Use for languages */}
            <Col>
              <p>
                <b>Languages:</b> {getLanguages()}
              </p>
              <p>
                <b>Currency:</b> {getCurrencies()}
              </p>
              <p>
                <b>Bordering Countries:</b> {getBorderCountries()}
              </p>
            </Col>
          
        </Row>
      </Row>
  ) : (
    <Spinner />
  );

  const holidaysCards = holidays ? (
    // Limits to showing only 5 holidays
    holidays
      .slice(0, 4)
      .map((holiday, i) => <CountryExtra key={i} holiday={holiday} />)
  ) : (
    <Spinner />
  );

  const handleClick = () => {
    setIsVisiable((v) => !v);
  };

  return (
    <AnimatedPage>
      <AnimatePresence mode="wait">
        <Container style={{ width: "50%", height: "100%"}} className="pt-3 my-auto" key={location.pathname} location={location}>
          <Row>
            <div className="d-flex justify-content-center mb-4 px-5">
              <Image src={country.flags.svg} fluid rounded style={{ maxHeight: "25vh" }} />
            </div>
            <div className="d-flex justify-content-center mb-3">
              <h1 className="mx-auto">{country.name.common}</h1>
            </div>
          </Row>

          <div className="d-flex justify-content-center mb-2">
          <Button onClick={() => {setIsVisiable(true)}} variant="secondary" size="sm" className="me-1"><i class="bi bi-caret-left"></i> </Button>
          <Button onClick={() => {setIsVisiable(false)}} variant="secondary" size="sm"><i class="bi bi-caret-right"></i> </Button>
          
          </div>
          {isVisible ? <AnimatedCountryInfo place={true}>
            <Row className="mb-3"> {countryInfo} </Row>
          </AnimatedCountryInfo> : ""}
          {/* Additional Country Info - 2nd API */}
          {!isVisible ?  <AnimatedCountryInfo place={false}>
            <Row> <h4 className="mb-3">Country Holidays</h4> {holidaysCards} </Row>
          </AnimatedCountryInfo> : ""}

        </Container>
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default SingleCountry;
