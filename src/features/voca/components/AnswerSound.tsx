import { RefObject } from "react";
import WrongAnswerAudio from "../assets/learning_wrong.mp3";
import CorrectAnswerAudio from "../assets/learning_right.mp3";

interface AnswerSoundProps {
  wrongAnswerAudioRef: RefObject<HTMLAudioElement>;
  correctAnswerAudioRef: RefObject<HTMLAudioElement>;
}

const AnswerSound: React.FC<AnswerSoundProps> = ({
  wrongAnswerAudioRef,
  correctAnswerAudioRef,
}) => {
  return (
    <div>
      <audio id="audio-answer-wrong" ref={wrongAnswerAudioRef}>
        <source src={WrongAnswerAudio} type="audio/mpeg" />
      </audio>
      <audio id="audio-answer-correct" ref={correctAnswerAudioRef}>
        <source src={CorrectAnswerAudio} type="audio/mpeg" />
      </audio>
    </div>
  );
};
export default AnswerSound;
