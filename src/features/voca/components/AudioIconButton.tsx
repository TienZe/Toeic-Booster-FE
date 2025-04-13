import { IconButton, IconButtonProps } from "@mui/material";
import AudioIcon from "../assets/audio-icon.svg";
import AudioPlayGif from "../assets/audio-active.gif";
import { useImperativeHandle, useRef, useState } from "react";
import AudioRef from "../types/AudioRef";

interface AudioIconButtonProps extends IconButtonProps {
  iconSize: number;
  audioUrl?: string;
  onClick?: () => void;
  audioRef?: React.RefObject<AudioRef>;
}

const AudioIconButton: React.FC<AudioIconButtonProps> = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(props.audioRef, () => ({
    play: () => {
      setIsPlaying(true);
      audioRef.current?.play();
    },
  }));

  const handleClick = () => {
    setIsPlaying(true);
    audioRef.current?.play();

    if (props.onClick) {
      props.onClick();
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <IconButton
      sx={{
        "&:hover": { backgroundColor: "initial" },
        padding: "0px",
        ...props.sx,
      }}
      onClick={handleClick}
    >
      <img
        src={isPlaying ? AudioPlayGif : AudioIcon}
        style={{ width: props.iconSize, height: props.iconSize }}
      />
      <audio
        ref={audioRef}
        src={props.audioUrl}
        onEnded={handleAudioEnd}
        style={{ display: "none" }}
      />
    </IconButton>
  );
};

export default AudioIconButton;
