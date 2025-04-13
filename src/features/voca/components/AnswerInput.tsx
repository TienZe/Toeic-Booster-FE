import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { useEffect, useRef } from "react";

interface AnswerInputProps extends OutlinedInputProps {
  status?: "correct" | "wrong" | "default";
  autoFocus?: boolean;
}

const wrongAnswerStyle = {
  background: "#FFDFE0",
  color: "#FF7878",
  borderColor: " #FF7878",
};

const correctAnswerStyle = {
  background: "#EAFFD9",
  color: "#58CC02",
  borderColor: "#A5ED6E",
};

const AnswerInput: React.FC<AnswerInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { sx, ...remain } = props;

  let appliedStyle = {};

  if (props.status === "wrong") {
    appliedStyle = wrongAnswerStyle;
  } else if (props.status === "correct") {
    appliedStyle = correctAnswerStyle;
  }

  useEffect(() => {
    if (props.autoFocus) {
      inputRef.current?.focus();
    }
  }, [props.autoFocus]);

  return (
    <OutlinedInput
      inputRef={inputRef}
      sx={{
        height: "68px",
        fontSize: "20px",
        border: "2px solid #e5e5e5",
        background: "#F7F7F7",
        borderRadius: "17px",
        "& fieldset": { display: "none" },
        ...sx,
        ...appliedStyle,
      }}
      {...remain}
    ></OutlinedInput>
  );
};

export default AnswerInput;
