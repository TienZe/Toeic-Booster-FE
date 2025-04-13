import { Box, Paper, Stack, Typography } from "@mui/material";
import { Image } from "../../../components/UI/Image";
import Link from "../../../components/UI/Link";

interface FeatureItemProps {
  title: string;
  description: string;
  image: string;
  to: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  image,
  to,
}) => {
  return (
    <Link to={to}>
      <Paper
        variant="outlined"
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: "16px",
          borderColor: "rgba(0, 0, 0, 0.2)",
          "&:hover": {
            borderColor: "primary.main",
            cursor: "pointer",
          },
        }}
      >
        <Stack direction="row" spacing={0.5} alignItems="start">
          <Image src={image} sx={{ maxWidth: "80px" }} />
          <Box sx={{ py: 0.5 }}>
            <Typography variant="h5" sx={{ fontSize: "18px" }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>{description}</Typography>
          </Box>
        </Stack>
      </Paper>
    </Link>
  );
};

export default FeatureItem;
