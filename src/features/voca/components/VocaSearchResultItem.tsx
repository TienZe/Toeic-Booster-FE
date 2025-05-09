import { Box, Typography } from "@mui/material";

type VocaSearchResultItemProps = {
  word: string;
  partOfSpeech: string;
  meaning: string;
  onClick: () => void;
  endIcon?: React.ReactNode;
};

const VocaSearchResultItem: React.FC<VocaSearchResultItemProps> = ({
  word,
  partOfSpeech,
  meaning,
  onClick,
  endIcon,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        my: "16px",
        "&:hover": { color: "primary.main" },
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ fontSize: "16px" }}>
        {word}:{" "}
        <Typography component="span" variant="body2" sx={{ marginRight: 1 }}>
          ({partOfSpeech})
        </Typography>
        {meaning}
      </Typography>

      {endIcon}
    </Box>
  );
};

export default VocaSearchResultItem;
