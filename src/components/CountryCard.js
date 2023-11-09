import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CountryCard = (props) => {
  // Keeps flag images consistant size
  const styles = {
    cardImage: {
      objectFit: "cover",
      width: "100%",
      height: "10rem",
    },
    cardText: {
      marginBottom: "6px",
      fontSize: "14px"
    },
    link: {
      textDecoration: "none",
      color: "inherit"
    }
  };

  return (
    <Card className="px-0 shadow-sm" border="light" style={{ width: "18rem" }}>
      <Card.Img
        src={props.flag}
        variant="top"
        alt={props.alt}
        style={styles.cardImage}
      />
      <Card.Body className="px-4">
        <Card.Title className="fs-5 mb-3">
          <Link to={`/country/${props.name}`}  style={styles.link}> {props.name} </Link>
        </Card.Title>
        <Card.Text style={styles.cardText}>Population: {props.population.toLocaleString()}</Card.Text>
        <Card.Text style={styles.cardText}>Region: {props.region}</Card.Text>
        <Card.Text style={styles.cardText}>Capital: {props.capital}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
