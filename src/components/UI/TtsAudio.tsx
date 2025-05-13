import { useImperativeHandle, useRef, useState } from "react";
import { tts } from "../../features/shared-apis/tts";

export interface TtsAudioRef {
  play: () => Promise<void>;
  pause: () => void;
}

interface TtsAudioProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
  audioUrl?: string | null;
  script?: string | null;
  audioRef?: React.RefObject<TtsAudioRef | undefined>;
}

const TtsAudio: React.FC<TtsAudioProps> = ({
  audioUrl,
  script,
  audioRef,
  ...audioProps
}) => {
  const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
  const audioEleRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(audioRef, () => ({
    play: async () => {
      const audioEle = audioEleRef.current;
      if (!audioEle) return;

      if (audioUrl) {
        audioEle.src = audioUrl;
      } else if (ttsAudioUrl) {
        // Already have the tts data
        audioEle.src = ttsAudioUrl;
      } else if (script) {
        // Use tts to generate the audio src
        const ttsAudioUrlResponse = await tts(script);
        audioEle.src = ttsAudioUrlResponse;

        setTtsAudioUrl(ttsAudioUrlResponse); // save for later usage
      }

      audioEle.play();
    },
    pause: () => {
      const audioEle = audioEleRef.current;
      if (!audioEle) return;

      audioEle.pause();
    },
  }));

  return (
    <audio {...audioProps} ref={audioEleRef} style={{ display: "none" }} />
  );
};

export default TtsAudio;
