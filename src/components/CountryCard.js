import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
  const styles = {
    // Keeps flag images consistant size
    cardImage: {
      objectFit: "cover",
      width: "100%",
      height: "10rem",
    },
    cardText: {
      marginBottom: "6px",
      fontSize: "14px",
    },
    link: {
      textDecoration: "none",
      color: "inherit",
    },
  };

  return (
    // Wrapping entire card in Link to make it clickable, not just Country
    <Link to={`/country/${props.name}`} style={styles.link}>
      <Card
        className="px-0 shadow-sm mx-auto"
        border="light"
        style={{ width: "18rem" }}
      >
        <Card.Img
          src={props.flag}
          variant="top"
          alt={props.alt}
          style={styles.cardImage}
        />
        <Card.Body className="px-4">
          <Card.Title className="fs-5 mb-3"> {props.name} </Card.Title>

          <Card.Text style={styles.cardText}>
            {/* toLocaleString() formates number to be read more easily */}
            Population: {props.population.toLocaleString()}
          </Card.Text>
          <Card.Text style={styles.cardText}>Region: {props.region}</Card.Text>
          <Card.Text style={styles.cardText}>
            Capital: {props.capital}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CountryCard;
