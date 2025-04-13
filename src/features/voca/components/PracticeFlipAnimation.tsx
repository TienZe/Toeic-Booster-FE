import { Box } from "@mui/material";
import React from "react";

interface PracticeFlipAnimationProps {
  firstSlide: React.ReactNode;
  secondSlide: React.ReactNode;
  flip?: boolean;
}
const PracticeFlipAnimation: React.FC<PracticeFlipAnimationProps> = ({
  firstSlide,
  secondSlide,
  flip = false,
}) => {
  return (
    // Need to add perspective to the parent element to make the 3D effect work (translate3d, rotate3d)
    <Box sx={{ perspective: "1000px" }}>
      <Box
        sx={{
          position: "relative",
          height: "260px",
          transformStyle: "preserve-3d",
          transform:
            "translate3d(0px, 0px, -76px)" +
            (flip ? " rotate3d(1, 0, 0, 120deg)" : ""),
          transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1) 0s",
          "& > div": {
            position: "absolute",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            transform: !flip
              ? "translate3d(0px, 0px, 76px)"
              : "translate3d(0px, -45px, 0px)", // need to hide the first slide behind the second slide
          }}
        >
          {firstSlide}
        </Box>

        <Box
          sx={{
            transform: "rotate3d(1, 0, 0, -120deg) translate3d(0px, 0px, 76px)",
          }}
        >
          {secondSlide}
        </Box>
      </Box>
    </Box>
  );
};

export default PracticeFlipAnimation;
