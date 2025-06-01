import React from "react";
import Box from "@mui/material/Box";
import { keyframes, useTheme } from "@mui/material/styles";

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }
  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
`;

const DotLoadingProgress: React.FC = () => {
  const theme = useTheme();
  const dotCount = 5;
  const delays = [-0.3, -0.1, 0.1, 0.3, 0.5];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {Array.from({ length: dotCount }).map((_, idx) => (
        <Box
          key={idx}
          sx={{
            height: 14,
            width: 14,
            marginRight: idx === dotCount - 1 ? 0 : 1, // theme.spacing(2) = 16px, so 2 = 16px, adjust as needed
            borderRadius: "50%",
            backgroundColor: theme.palette.primary.main,
            animation: `${pulse} 1.5s infinite ease-in-out`,
            animationDelay: `${delays[idx]}s`,
          }}
        />
      ))}
    </Box>
  );
};

export default DotLoadingProgress;
