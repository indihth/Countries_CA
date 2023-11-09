import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Spinner, Image } from "react-bootstrap";
import CountryExtra from "../components/CountryExtra";

const SingleCountry = () => {
  // References the route param from App.js Route
  let { name } = useParams();

  const [countriesList, setCountriesList] = useState([]);
  const [country, setCountry] = useState("");

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
        // console.log(response.data[0]);
        setCountry(response.data[0]);
      })
      .catch((error) => {
        console.error();
        console.log("not a country");
      });
  }, []);

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

  return (
    <>
      <Row>
        <Col>
          <Image src={country.flags.png} />
        </Col>
        <Col>
          <h2>{country.name.common}</h2>
          <Row>
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
              {/* Returns array of currencies, then display 'name' of first currency in array. Use for languages */}
              <p>
                <b>Languages:</b> {getLanguages()}
              </p>
            </Col>
            <Col>
              <p>
                {/* <b>Currency:</b> {Object.values(country.currencies)[0].name} */}
                <b>Currency:</b> {getCurrencies()}
              </p>
            </Col>
          </Row>
          <p>
            <b>Bordering Countries:</b> {getBorderCountries()}
          </p>
        </Col>
      </Row>

      {/* Additional Country Info - 2nd API */}
      <Row>
        <CountryExtra />
      </Row>
    </>
  );
};

export default SingleCountry;
