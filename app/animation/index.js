import { motion } from "framer-motion";

export const FadeIn = ({ children, userSettings }) => (
  <motion.div
    animate={{
      opacity: userSettings.finished ? 0 : 1,
      transitionEnd: {
        display: userSettings.finished ? "none" : "block",
      },
    }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export const FadeOut = ({ children, userSettings }) => (
  <motion.div
    animate={{
      opacity: userSettings.finished ? 1 : 0,
      transitionEnd: {
        display: userSettings.finished ? "flex" : "none",
      },
    }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
