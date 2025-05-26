import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

interface CustomPaperProps {
  isActive?: boolean;
  isDisabled?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  isChosen?: boolean;
  isExplain?: boolean;
}

const Item = styled(Paper, {
  shouldForwardProp: (prop) =>
    ![
      "isActive",
      "isDisabled",
      "isCorrect",
      "isIncorrect",
      "isChosen",
      "isExplain",
    ].includes(prop as string),
})<CustomPaperProps>(
  ({ isActive, isDisabled, isCorrect, isIncorrect, isChosen, isExplain }) => ({
    backgroundColor: isActive
      ? "#EBF5FF"
      : isCorrect && isChosen
        ? "#F0FDF4"
        : isCorrect
          ? "white"
          : isIncorrect
            ? "#FDF2F3"
            : "#fff",
    padding: "12px",
    border: isActive
      ? "1px solid #0071F9"
      : isCorrect
        ? "1px solid #00B035"
        : isIncorrect
          ? "1px solid #E20D2C"
          : isExplain && isDisabled
            ? "1px solid #0071F9"
            : isDisabled
              ? ""
              : "1px solid #f0f0f0",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: isActive ? "#EBF5FF" : isDisabled ? "" : "",
      border: isDisabled
        ? undefined
        : isActive
          ? "1px solid #0071F9"
          : "1px solid #F9A95A",
      cursor: "pointer",
      "& .innerBox": {
        backgroundColor: isDisabled
          ? undefined
          : isActive
            ? "#0071F9"
            : "#6B7280",
        color: isDisabled ? undefined : "white",
      },
    },
  }),
);

export default Item;
