import { Card, CardContent, Typography } from "@mui/material";

const AudioCard = ({ title, src }: { title?: string; src: string }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <audio controls style={{ width: "100%" }}>
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </CardContent>
    </Card>
  );
};

export default AudioCard;
