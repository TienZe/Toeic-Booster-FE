import { Box, Typography } from "@mui/material";
import React from "react";

import RightAnswerGif from "../assets/right-answer.gif";
import { Image } from "../../../components/UI/Image";

interface AnswerGuessItemProps {
  answer: string;
  onClick?: (selectedAnswer: string) => void;
  state?: "correct" | "wrong" | "default";
  disabled?: boolean;
}

function getStyleByAnswerState(state: "correct" | "wrong" | "default") {
  switch (state) {
    case "correct":
      return {
        borderColor: "#A5ED6E",
        backgroundColor: "#EAFFD9",
        color: "#58CC02",
      };
    case "wrong":
      return {
        borderColor: "#D33113",
        backgroundColor: "#FFEEEE",
        color: "#FF4B4B",
      };
    default:
      return {
        backgroundColor: "white",
      };
  }
}

const AnswerGuessItem: React.FC<AnswerGuessItemProps> = ({
  answer,
  state = "default",
  disabled = false,
  onClick,
}) => {
  const style = getStyleByAnswerState(state);

  const handleClick = () => {
    if (disabled) return;

    onClick?.(answer);
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "relative",
        height: "70px",
        borderRadius: "15px",
        border: "2px solid #e5e5e5",
        borderBottom: "5px solid #e5e5e5",
        fontSize: "16px",
        color: "#777777",
        px: "15px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        fontWeight: "medium",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        "&:hover": {
          backgroundColor: !disabled ? "#F7F7F7" : "inherit",
        },
        ...style,
      }}
    >
      <Typography variant="inherit">{answer}</Typography>
      {state === "correct" && (
        <Image
          key={Date.now()}
          src={RightAnswerGif + `?cacheBuster=${Date.now()}`}
          sx={{ position: "absolute" }}
        />
      )}
    </Box>
  );
};

export default AnswerGuessItem;
