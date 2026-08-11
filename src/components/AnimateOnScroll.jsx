import { motion } from "motion/react";

const variants = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  },

  fadeDown: {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  },

  fadeLeft: {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  },

  fadeRight: {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  },

  zoom: {
    hidden: {
      opacity: 0,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
};

function AnimateOnScroll({
  children,
  variant = "fadeUp",
  duration = 0.6,
  delay = 0,
  once = true,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimateOnScroll;