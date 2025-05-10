import React from "react";
import FlashCard from "./FlashCard";
import { Typography } from "@mui/material";
import Vocabulary from "../../../types/Vocabulary";
import { vocaWordClassFullName2Abbr } from "../../../utils/helper";

interface Slide1 {
  onClick?: () => void;
  voca: Vocabulary;
}

const Slide1: React.FC<Slide1> = ({ onClick, voca }) => {
  return (
    <FlashCard onClick={onClick} vocaImage={voca.image}>
      <Typography color="#b4b4b4" fontSize={20}>
        Definition:
      </Typography>
      <Typography
        sx={{
          my: "10px",
          fontSize: "20px",
          lineHeight: "29px",
          color: "#4C4C4C",
        }}
      >
        <Typography variant="inherit" component="span" color="primary.main">
          {`(${vocaWordClassFullName2Abbr(voca.type)})` + " "}
        </Typography>
        {voca.definition}
      </Typography>
    </FlashCard>
  );
};

export default Slide1;
