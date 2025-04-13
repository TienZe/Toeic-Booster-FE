import { Box, Grid2, Typography } from "@mui/material";
import UserImage from "../assets/profile.png";
import VocaImage from "../assets/flashcard.png";
import ExamImage from "../assets/learning.png";
import ListenImage from "../assets/multimedia.png";
import FeatureItem from "./FeatureItem";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        Admin Management
      </Typography>

      <Grid2 container spacing={1.5} sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FeatureItem
            title="Users"
            description="Activate or deactivate accounts, view detailed user information, and maintain control over user access."
            image={UserImage}
            to="/admin/account"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FeatureItem
            title="Vocabularies"
            description="Create and manage vocabularies through custom sets, multiple lessons and variety of vocabulary items."
            image={VocaImage}
            to="/admin/voca-set"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FeatureItem
            title="TOEIC Exams"
            description="Create and manage TOEIC exams divided into 7 parts, each focusing on different aspects of the exam."
            image={ExamImage}
            to="/admin/exam-set"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FeatureItem
            title="Listening Lessons"
            description="Curate and manage dictation listening lessons, helping users improve their listening skills."
            image={ListenImage}
            to="/admin/listen-group"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
