import { Box, Paper, SxProps } from "@mui/material";
import { VocabularyCardState } from "./VocabularyCard";
import React from "react";
import TurnIcon from "./TurnIcon";

function getCardStyle(state: VocabularyCardState) {
  switch (state) {
    case "success":
      return {
        borderColor: "#A5ED6E",
        backgroundColor: "#EAFFD9",
        color: "#58CC02",
      };
    case "error":
      return {
        borderColor: "#FF7878",
        backgroundColor: "#FFEEEE",
        color: "#FF4B4B",
      };
    default:
      return {
        backgroundColor: "white",
      };
  }
}

const VocabularyCardWrapper: React.FC<{
  children: React.ReactNode;
  state?: VocabularyCardState;
  sx?: SxProps;
  onClickFlipButton?: () => void;
}> = ({
  children,
  state = VocabularyCardState.DEFAULT,
  sx,
  onClickFlipButton,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "184px",
        height: "240px",
        borderRadius: "10px",
        borderWidth: "2px",
        // backgroundColor: "white",
        position: "relative",
        ...sx,
        ...getCardStyle(state),
      }}
    >
      {children}
      <Box
        sx={{
          padding: "8px",
          backgroundColor: "white",
          position: "absolute",
          bottom: 10,
          right: 10,
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        <TurnIcon
          onClick={onClickFlipButton}
          sx={{
            color: "primary.main",
          }}
        />
      </Box>
    </Paper>
  );
};

export default VocabularyCardWrapper;
