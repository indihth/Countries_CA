import { Col } from "react-bootstrap";

const CountryExtra = ({ holiday }) => {

  // Stores the datetime object in variable - year, month and day
  const datetime = holiday.date.datetime;

  // Create a new js Date object
  const formattedDate = new Date(
    datetime.year,
    datetime.month - 1, // Month is 0-based in JavaScript Date object
    datetime.day
  ).toLocaleDateString('en-BG', {
    // Defines how the date will be formatted
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
      <p><b>{holiday.name}</b> - {formattedDate}</p>
  );
};

export default CountryExtra;
