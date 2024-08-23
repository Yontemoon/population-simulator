import { motion } from "framer-motion";

const SwapCountry = ({ children }: { children: React.ReactNode }) => {
  const spring = {
    type: "tween",
    damping: 20,
    stiffness: 300,
  };
  return (
    <motion.li layout transition={spring}>
      {children}
    </motion.li>
  );
};

export default SwapCountry;
