import { Stack, Typography } from "@mui/material";
import VocaFeatBullet from "../assets/voce-feat-bullet.svg";

const VocaFeatureItem: React.FC<{ feature: string }> = ({ feature }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <img
        src={VocaFeatBullet}
        alt="bullet"
        style={{ width: 16, height: 16 }}
      />
      <Typography>{feature}</Typography>
    </Stack>
  );
};

export default VocaFeatureItem;
