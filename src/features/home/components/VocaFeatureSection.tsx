import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import VocaFeatureItem from "./VocaFeatureItem";
import VocaFeatTopicsImg from "../assets/voca-feat-topics.png";
import VocaFeatBottom from "../assets/voca-feat-bottom.png";

const VocaFeatureSection: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "grey.50" }}>
      <Container fixed sx={{ py: { xs: 5, lg: 7 } }}>
        <Grid2 container columns={7} spacing={2}>
          <Grid2
            size={{ xs: 7, lg: 4 }}
            display="flex"
            alignItems="center"
            sx={{ marginTop: { xs: 3, lg: 0 } }}
          >
            <Stack spacing={2}>
              <Typography variant="h3" color="primary.main">
                Expand Your Vocabulary with Flashcards and Images
              </Typography>
              <Typography fontSize={18}>
                Enhance your vocabulary learning experience with our interactive
                flashcards.
              </Typography>
              <Stack component="ul" spacing={0.5}>
                <VocaFeatureItem feature="Includes images to help you better retain new words" />
                <VocaFeatureItem feature="Offers a wide range of vocabulary sets tailored to various topics" />
                <VocaFeatureItem feature="Helps improve your language skills effectively through visual learning" />
              </Stack>
            </Stack>
          </Grid2>
          <Grid2
            size={{ xs: 7, lg: 3 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: { xs: 5, lg: 0 }, marginBottom: { xs: 8, lg: 0 } }}
          >
            <Stack spacing={1.5}>
              <img src={VocaFeatTopicsImg} />
              <img src={VocaFeatBottom} />
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default VocaFeatureSection;
