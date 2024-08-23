import { motion } from "framer-motion";

const SwapCountry = ({
  children,
  key,
}: {
  children: React.ReactNode;
  key: string;
}) => {
  const spring = {
    type: "tween",
    damping: 20,
    stiffness: 300,
  };
  return (
    <motion.li key={key} layout transition={spring}>
      {children}
    </motion.li>
  );
};

export default SwapCountry;
