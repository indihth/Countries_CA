import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

const AnimatedCard = ({ children, index }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, delay: index * 0.03  }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
