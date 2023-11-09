import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";

const APIKEY = "8wE3H9KB/1WXOFlZhgHBFQ==vlritFsAYFRkiTDg";

const CountryExtra = () => {
  let { name } = useParams();

  const [details, setDetails] = useState();

  useEffect(() => {
    axios
      .get(`https://api.api-ninjas.com/v1/country?name=${name}`, {
        headers: { "X-Api-Key": APIKEY },
      })
      .then((res) => {
        setDetails(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const lifeExpectancy = () => {
    if (details.life_expectancy_female && details.life_expectancy_male) {
      return (
        <>
          <h5>Life Expectancy</h5>
          <p>
            <b>Female: </b>
            {details.life_expectancy_female} years | <b>Male: </b>
            {details.life_expectancy_male} years
          </p>
          <br />
        </>
      );
    }
  };

  return (
    <>
      <Col>
        <h3>Population Information</h3>
        <br />
        {lifeExpectancy}
        {/* <h5>Unemplyment - {details.unemployment}%</h5>
        <h5>Co2 Emmssions - {details.co2_emissions} tons</h5> */}
      </Col>
    </>
  );
};

export default CountryExtra;
