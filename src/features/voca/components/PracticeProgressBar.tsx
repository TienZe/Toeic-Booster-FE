import { LinearProgress } from "@mui/material";

interface PracticeProgressBarProps {
  progress: number;
}
const PracticeProgressBar: React.FC<PracticeProgressBarProps> = ({
  progress,
}) => {
  return (
    <LinearProgress
      variant="determinate"
      value={100}
      color="success"
      sx={{
        width: "100%",
        height: "15px",
        borderRadius: "10px",
        backgroundColor: "#f0f0f0",
        flexGrow: 1,
        "& .MuiLinearProgress-bar": {
          border: "5px solid #7AC70C",
          background: "#8EE000",
          borderRadius: "23px",
          transform: "none",
          width: `${progress}% !important`,
          transition: "width 0.3s ease-in-out",
        },
      }}
    />
  );
};

export default PracticeProgressBar;
