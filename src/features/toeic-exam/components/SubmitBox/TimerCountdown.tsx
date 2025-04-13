import { Box } from "@mui/material";
import {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toHHMMSS } from "../../utils/helper";

export interface TimerCountdownRef {
  submit: () => number;
}

interface TimerCountdownProps {
  duration: string;
  timerRef?: RefObject<TimerCountdownRef>;
  handleSubmit: () => void;
}

const TimerCountdown: React.FC<TimerCountdownProps> = ({
  duration,
  timerRef,
  handleSubmit,
}) => {
  const [time, setTime] = useState<number>(+duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useImperativeHandle(timerRef, () => ({
    submit: () => {
      clearInterval(intervalRef.current!);
      return time;
    },
  }));

  useEffect(() => {
    if (+duration > 0 && time < 1) {
      handleSubmit();
      return;
    }
  }, [time]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (+duration > 0) {
          return prevTime > 0 ? prevTime - 1 : 0;
        }

        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          fontSize: "25px",
          fontWeight: "600",
        }}
      >
        {toHHMMSS(time)}
      </Box>
    </>
  );
};

export default TimerCountdown;
