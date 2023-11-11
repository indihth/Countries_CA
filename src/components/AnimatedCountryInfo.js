import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100}
};

const AnimatedCountryInfo = ({ children, place }) => {
  let initialP;
  let endP;
console.log(place)

  if (place == true) {
    initialP = -100;
    endP = -100;
  } else if (place == false) {
    initialP = 100;
    endP = 100;
  }

  return (
    <motion.div
      // variants={animations}
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
