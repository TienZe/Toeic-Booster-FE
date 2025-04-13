import { motion, Variants } from "framer-motion";
import FlashCardCompositionAnimationType from "../types/FlashCardCompositionAnimationType.ts";

interface FlashCardAnimationWrapperProps {
  children: React.ReactNode;
  visible?: boolean;
  animate?: FlashCardCompositionAnimationType;
}

const variants: Variants = {
  enterRight: {
    opacity: [0, 0.9, 1],
    x: [0, "30%", 0],
    y: [0, 60, 0],
    scale: [1, 0.8, 1],
  },
  exitLeft: {
    opacity: [1, 0.9, 0],
    x: [0, "-30%", 0],
    y: [0, 60, 0],
    scale: [1, 0.8, 1],
  },
  enterLeft: {
    opacity: [0, 0.9, 1],
    x: [0, "-30%", 0],
    y: [0, 60, 0],
    scale: [1, 0.8, 1],
  },
  exitRight: {
    opacity: [1, 0.9, 0],
    x: [0, "30%", 0],
    y: [0, 60, 0],
    scale: [1, 0.8, 1],
  },
  initial: { opacity: 1, x: 0, scale: 1 },
};

const FlashCardAnimationWrapper: React.FC<FlashCardAnimationWrapperProps> = ({
  children,
  animate,
  visible,
}) => {
  return (
    <motion.div
      variants={variants}
      animate={animate}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {children}
    </motion.div>
  );
};

export default FlashCardAnimationWrapper;
