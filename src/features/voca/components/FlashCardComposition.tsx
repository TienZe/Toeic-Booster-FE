import { Box } from "@mui/material";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide1 from "./Slide1";
import AnswerForm from "./AnswerForm";
import { useRef, useState } from "react";
import Vocabulary from "../../../types/Vocabulary";
import FlashCardAnimationWrapper from "./FlashCardAnimationWrapper";
import AudioRef from "../types/AudioRef";
import FlashCardCompositionAnimationType from "../types/FlashCardCompositionAnimationType";

interface FlashCardCompositionProps {
  voca: Vocabulary;
  onWrongAnswer?: () => void;
  onCorrectAnswer?: () => Promise<void>;
  onSubmitAfterCorrectAnswer?: () => void;
  animate?: FlashCardCompositionAnimationType;
  visible?: boolean; // current or previous flashcard are visible
  active?: boolean; // current flashcard is active
}

const FlashCardComposition: React.FC<FlashCardCompositionProps> = ({
  voca,
  onWrongAnswer,
  onCorrectAnswer,
  onSubmitAfterCorrectAnswer,
  animate,
  visible = false,
  active = false,
}) => {
  const [activeSide, setActiveSide] = useState(0);

  // Status of the answer input
  const [status, setStatus] = useState<"correct" | "wrong" | "default">(
    "default",
  );

  const phoneticAudioRef = useRef<AudioRef>(null);

  const actualActiveSide = ((activeSide % 3) + 3) % 3;

  const handleClickFlashCard = () => {
    setActiveSide((prev) => prev + 1);
  };

  const handleSubmitAnswer = async (answer: string) => {
    if (!answer) return;

    if (status === "correct" && onSubmitAfterCorrectAnswer) {
      onSubmitAfterCorrectAnswer();
      return;
    }

    if (answer.toLowerCase() === voca.word.toLowerCase()) {
      setStatus("correct");

      // Go to the third slide
      const nextThirdSide = (Math.floor(activeSide / 3) + 1) * 3 - 1;
      setActiveSide(nextThirdSide);

      if (onCorrectAnswer) {
        await onCorrectAnswer();
      }

      // Play phonetic audio of the vocabulary
      phoneticAudioRef.current?.play();
    } else {
      setStatus("wrong");
      if (onWrongAnswer) {
        onWrongAnswer();
      }
    }
  };

  const handleChangeInput = () => {
    setStatus("default");
  };

  return (
    <FlashCardAnimationWrapper animate={animate} visible={visible}>
      <Box sx={{ position: "absolute", width: "100%", zIndex: active ? 2 : 0 }}>
        <Box sx={{ perspective: "1000px" }}>
          <Box
            sx={{
              position: "relative",
              transformStyle: "preserve-3d",
              height: "338px",
              transform: `translate3d(0px, 0px, -160px) rotate3d(1, 0, 0, ${
                activeSide * -120
              }deg)`,
              transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0s",
              "& > div": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 2,
              },
            }}
          >
            <Box
              sx={{
                transform: `rotate3d(1, 0, 0, 0deg) ${
                  actualActiveSide == 0
                    ? " translate3d(0px, 0px, 160px)"
                    : actualActiveSide == 1
                      ? " translate3d(0px, 0px, 110px)"
                      : ""
                }`,
                display: actualActiveSide == 2 ? "none" : "block",
              }}
            >
              <Slide1 onClick={handleClickFlashCard} voca={voca} />
            </Box>
            <Box
              sx={{
                transform: `rotate3d(1, 0, 0, 120deg) ${
                  actualActiveSide == 1
                    ? " translate3d(0px, 0px, 160px)"
                    : actualActiveSide == 2
                      ? " translate3d(0px, 0px, 110px)"
                      : ""
                }`,
                display: actualActiveSide == 0 ? "none" : "block",
              }}
            >
              <Slide2 onClick={handleClickFlashCard} voca={voca} />
            </Box>
            <Box
              sx={{
                transform: `rotate3d(1, 0, 0, -120deg) ${
                  actualActiveSide == 2
                    ? " translate3d(0px, 0px, 160px)"
                    : actualActiveSide == 0
                      ? " translate3d(0px, 0px, 110px)"
                      : ""
                }`,
                display: actualActiveSide == 1 ? "none" : "block",
              }}
            >
              <Slide3
                onClick={handleClickFlashCard}
                voca={voca}
                phoneticAudioRef={phoneticAudioRef}
              />
            </Box>
          </Box>
        </Box>
        {/* Form answer */}
        <AnswerForm
          status={status}
          active={active}
          onSubmit={handleSubmitAnswer}
          onChange={handleChangeInput}
          sx={{ marginTop: 2.5 }}
        />
      </Box>
    </FlashCardAnimationWrapper>
  );
};

export default FlashCardComposition;
