import { Box } from "@mui/material";

const PracticeSlideCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        height: "260px",
        border: "2px solid #E5E5E5",
        borderRadius: "20px",
        borderBottom: "6px solid #E5E5E5",
        backgroundColor: "white",
        padding: "25px 30px",
      }}
    >
      {children}
    </Box>
  );
};

export default PracticeSlideCard;
