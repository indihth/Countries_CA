import { motion } from "framer-motion";

//////////////////
// Gives staggered fade animation for country cards
//////////////////

// Defines the starting and end points of animation
const animations = {
  initial: { opacity: 0 },  // Fully transparent
  animate: { opacity: 1 }  //  Fully visable
};

// Component takes in the entire country card as a prop, and the generated index from the mapping function
const AnimatedCard = ({ children, index }) => {
  return (
    // Pass the animations into the div
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      // Index variable used to stagger the delays between cards appearing - one after another
      transition={{ duration: 0.6, delay: index * 0.03  }}
    >
      {/* Displays entire CountryCard */}
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
