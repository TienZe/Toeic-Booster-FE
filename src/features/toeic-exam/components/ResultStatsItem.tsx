import { Box, Stack, Typography } from "@mui/material";

interface ResultStatsItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ResultStatsItem = ({ icon, title, value }: ResultStatsItemProps) => {
  return (
    <Stack sx={{ display: "flex" }} spacing={1} direction="row">
      <Box sx={{ pt: 0.5 }}>{icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "secondary.dark",
            fontSize: "1rem",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ResultStatsItem;
