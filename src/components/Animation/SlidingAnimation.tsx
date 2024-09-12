import { AnimatePresence, motion } from "framer-motion";
import { generateRandomInteger } from "../../helper/utils";
import { useEffect, useState } from "react";

const SlidingAnimation = ({ children }: { children: React.ReactNode }) => {
  const randomInt = generateRandomInteger();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log(document.visibilityState);
      if (document.visibilityState === "visible") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={randomInt}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlidingAnimation;
