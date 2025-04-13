import { Box, Button, Drawer, Stack, Typography } from "@mui/material";

interface ConfirmDrawerProps {
  openConfirm: boolean;
  setOpenConfirm: (v: boolean) => void;
  handleSubmit?: () => void;
}
const ConfirmDrawer: React.FC<ConfirmDrawerProps> = ({
  openConfirm,
  setOpenConfirm,
  handleSubmit,
}) => {
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  return (
    <div>
      <Drawer anchor="bottom" open={openConfirm} onClose={handleCancel}>
        <Stack px={4} py={2} direction={"row"} justifyContent={"space-between"}>
          <div>
            <Typography variant="h5" gutterBottom>
              Confirm
            </Typography>
            <Typography>Are you sure you want to submit</Typography>
          </div>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </div>
  );
};

export default ConfirmDrawer;
