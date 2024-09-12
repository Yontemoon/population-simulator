import { AnimatePresence, motion } from "framer-motion";
import { generateRandomInteger } from "../../helper/utils";

const SlidingAnimation = ({ children }: { children: React.ReactNode }) => {
  const randomInt = generateRandomInteger();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={randomInt}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SlidingAnimation;
