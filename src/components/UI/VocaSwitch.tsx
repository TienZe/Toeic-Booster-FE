import { Box, SxProps } from "@mui/material";
import SwitchActive from "../../assets/images/UI/switch-active.svg";
import SwitchInactive from "../../assets/images/UI/switch-gray.svg";
import { Image } from "./Image";

interface VocaSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  sx?: SxProps;
}

const VocaSwitch: React.FC<VocaSwitchProps> = ({ checked, onChange, sx }) => {
  return (
    <Box sx={sx}>
      <Image
        src={checked ? SwitchActive : SwitchInactive}
        alt="switch"
        onClick={() => onChange(!checked)}
      />
    </Box>
  );
};

export default VocaSwitch;
