import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export interface SideDrawerProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

// Open from the right side
const drawerVariants = {
  open: {
    x: 0,
    y: 0,
    display: "block",
  },
  closed: {
    x: "100%",
    y: 0,
  },
};

const SideDrawer: React.FC<SideDrawerProps> = ({ open, children, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%", y: 0, display: "none" }} // start state to animate when component is mounted
          animate={"open"} // mount animation
          exit={"closed"} // unmount animation
          variants={drawerVariants}
          transition={{ duration: 0.3, type: "tween" }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1000,
            backgroundColor: "white",
            width: "100%",
            minHeight: "100%",
          }}
        >
          {onClose && (
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                transform: "translate(-50%, 50%)",
              }}
            >
              <Close sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
