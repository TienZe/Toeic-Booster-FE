import VocabularyFrontSide from "./VocabularyFrontSide";
import VocabularyCardWrapper from "./VocabularyCardWrapper";
import VocabularyBackSide from "./VocabularyBackSide";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface VocabularyCardProps {
  word: string;
  phonetic: string;
  thumbnail: string | null;
  type: string;
  meaning: string;
  state?: VocabularyCardState;
  audio?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

export enum VocabularyCardState {
  DEFAULT = "default",
  SUCCESS = "success",
  ERROR = "error",
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  phonetic,
  thumbnail,
  type,
  meaning,
  state,
  audio,
  onDelete,
  onEdit,
}) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    let audioElement: HTMLAudioElement;
    if (flip) {
      audioElement = new Audio(audio);
      audioElement.play();
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [flip, audio]);
  return (
    <Box sx={{ perspective: "1000px" }}>
      <Box
        sx={{
          position: "relative",
          width: "184px",
          height: "240px",
          transform: flip ? "rotateY(180deg)" : "",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
        }}
      >
        <VocabularyCardWrapper
          state={state}
          sx={{
            position: "absolute",
            zIndex: 1, // show first slide first
          }}
          onClickFlipButton={() => setFlip((pre) => !pre)}
        >
          <VocabularyFrontSide
            word={word || ""}
            phonetic={phonetic || ""}
            image={thumbnail}
            onClose={onDelete}
            onEdit={onEdit}
          />
        </VocabularyCardWrapper>
        <VocabularyCardWrapper
          state={state}
          sx={{
            position: "absolute",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
          onClickFlipButton={() => setFlip((pre) => !pre)}
        >
          <VocabularyBackSide type={type} meaning={meaning} />
        </VocabularyCardWrapper>
      </Box>
    </Box>
  );
};

export default VocabularyCard;
