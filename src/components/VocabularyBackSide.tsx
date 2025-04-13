import { Stack, Typography } from "@mui/material";

interface VocabularyBackSideProps {
  type: string;
  meaning: string;
}

const VocabularyBackSide: React.FC<VocabularyBackSideProps> = ({
  type,
  meaning,
}) => {
  return (
    <Stack
      sx={{ padding: "15px", height: "100%" }}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography
        sx={{ fontSize: "14px", color: "#777777", marginBottom: "5px" }}
      >
        {`(${type})`}
      </Typography>
      <Typography
        variant="inherit"
        sx={{ fontSize: "18px", lineHeight: "22px", marginBottom: "10px" }}
      >
        {meaning}
      </Typography>
    </Stack>
  );
};
export default VocabularyBackSide;
