import { AnimatePresence, motion } from "framer-motion";

const AddCountry = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        initial={{ opacity: 0, x: -400, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 200, scale: 1.2 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AddCountry;
