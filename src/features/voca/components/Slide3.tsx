import React from "react";
import FlashCard from "./FlashCard";
import { Stack, Typography } from "@mui/material";

import AudioIconButton from "./AudioIconButton";
import Vocabulary from "../../../types/Vocabulary";
import AudioRef from "../types/AudioRef";

interface Slide3 {
  onClick?: () => void;
  voca: Vocabulary;
  phoneticAudioRef?: React.RefObject<AudioRef>;
}

const Slide3: React.FC<Slide3> = ({ onClick, voca, phoneticAudioRef }) => {
  const parts = voca.example?.split(voca.word);

  const displayExample = parts ? (
    <span>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <Typography
              variant="inherit"
              component="span"
              sx={{ color: "success.main" }}
            >
              {voca.word}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </span>
  ) : (
    ""
  );

  return (
    <FlashCard onClick={onClick} vocaImage={voca.image}>
      <Typography
        color="#4C4C4C"
        fontSize={35}
        sx={{ marginTop: "-10px", fontWeight: "600" }}
      >
        {voca.word}
        <Typography component="span" color="#B4B4B4" sx={{ fontSize: 20 }}>
          {" "}
          {`(${voca.type})`}
        </Typography>
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ my: "10px" }}
      >
        <AudioIconButton
          iconSize={41}
          audioUrl={voca.phoneticAudio}
          audioRef={phoneticAudioRef}
        />
        <Typography component="span" color="#777777" sx={{ fontSize: "20px" }}>
          {voca.phonetic}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        alignItems="start"
        sx={{ marginTop: "20px" }}
      >
        <AudioIconButton iconSize={41} audioUrl={voca.exampleAudio} />
        <div
          style={{ marginTop: "-5px", marginRight: "115px", overflowY: "auto" }}
        >
          <div>
            <Typography
              component="span"
              color="#4C4C4C"
              sx={{ fontSize: "20px" }}
            >
              {displayExample}
            </Typography>
            <Typography color="#777777">{voca.exampleMeaning}</Typography>
          </div>
        </div>
      </Stack>
    </FlashCard>
  );
};

export default Slide3;
