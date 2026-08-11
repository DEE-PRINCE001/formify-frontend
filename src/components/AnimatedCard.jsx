import { motion } from "motion/react";

function AnimatedCard({
  children,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.2,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;