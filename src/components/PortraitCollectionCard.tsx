import {
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { briefString } from "../utils/stringFormatter";
import VocaSetModel from "../types/VocaSetModel";
import DefaultVocaSetThumbnail from "../assets/images/voca/default.png";
import Link from "./UI/Link";

const PortraitCollectionCard: React.FC<{
  vocaSet: VocaSetModel;
}> = ({ vocaSet }) => {
  return (
    <Stack
      sx={{
        width: 220,
        border: "1px solid #e0e0e0",
        borderRadius: "0.5rem",
        padding: 1,
      }}
      justifyContent={"space-between"}
    >
      <CardMedia
        component="img"
        image={vocaSet.thumbnail || DefaultVocaSetThumbnail}
        alt="The Cardboard Kingdom book cover"
        sx={{ height: "150px", width: "auto", margin: "0 auto" }}
      />
      <Box>
        <CardContent
          sx={{
            py: 1,
            px: 0,
            pt: "12px",
            pb: "1rem !important",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 0.5, textAlign: "center" }}
          >
            {vocaSet.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            fontSize={"0.875rem"}
          >
            {briefString(vocaSet.description || "", 70)}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ padding: 0 }}>
        <Link to={`/voca/${vocaSet.id}/lessons`} sx={{ width: "100%" }}>
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{
              color: "text.secondary",
              borderColor: "grey.300",
              "&:hover": { backgroundColor: "grey.100" },
            }}
          >
            Learn
          </Button>
        </Link>
      </CardActions>
    </Stack>
  );
};

export default PortraitCollectionCard;
