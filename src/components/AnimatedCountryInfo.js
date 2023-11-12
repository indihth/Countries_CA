import { motion } from "framer-motion";

//////////////////
// Fade animation on between Country and Holiday info components on SingleCountry page
//////////////////

const AnimatedCountryInfo = ({ children, place }) => {

  // Initialise start and end variables
  let initialP;
  let endP;

  // Place prop defines if the component is the first or second to be display - change positions accordingly
  if (place == true) {
    initialP = -100;
    endP = -100;
  } else if (place == false) {
    initialP = 100;
    endP = 100;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: initialP }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: endP }}
      transition={{ duration: .2}}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCountryInfo;
