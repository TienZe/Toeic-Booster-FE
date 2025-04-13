import { Drawer, DrawerProps, Stack, Typography } from "@mui/material";
import BoldStrokeButton from "./BoldStrokeButton";
import Link from "../../../components/UI/Link";

interface SuspendLearningDrawerProps extends DrawerProps {
  exitLink?: string;
  onClickStay?: () => void;
}

const SuspendLearningDrawer: React.FC<SuspendLearningDrawerProps> = ({
  exitLink = "#",
  onClickStay,
  ...drawerProps
}) => {
  return (
    <Drawer
      anchor="bottom"
      // open={openExitDrawer}
      sx={{ height: "200px" }}
      {...drawerProps}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: "35px", maxWidth: "1022px", mx: "auto", width: "100%" }}
      >
        <div>
          <Typography
            sx={{ fontSize: "24px", color: "#4c4c4c", fontWeight: "600" }}
          >
            Are you sure you want to stop?
          </Typography>
          <Typography sx={{ fontSize: "18px" }}>
            You will lose all the progress you’ve just made!
          </Typography>
        </div>

        <Stack direction="row" spacing={1}>
          <BoldStrokeButton
            variant="outlined"
            sx={{
              color: "#B4B4B4",
              width: "230px",
            }}
            onClick={onClickStay}
          >
            STAY
          </BoldStrokeButton>

          <Link to={exitLink}>
            <BoldStrokeButton
              variant="contained"
              sx={{
                width: "230px",
              }}
            >
              EXIT
            </BoldStrokeButton>
          </Link>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default SuspendLearningDrawer;
