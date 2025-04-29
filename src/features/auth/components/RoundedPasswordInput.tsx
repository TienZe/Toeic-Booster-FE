import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { RoundedInputProps } from "../../../components/UI/RoundedInput";

const RoundedPasswordInput: React.FC<RoundedInputProps> = ({
  label,
  placeholder = "",
  validationError = "",
  gap = 1,
  padding = "4px 12px",
  borderRadius = 6,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = Boolean(validationError);

  return (
    <Stack spacing={gap}>
      <Typography component="label" sx={{ color: "secondary.dark" }}>
        {label}
      </Typography>
      <FormControl error={hasError}>
        <OutlinedInput
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          {...props} // Spread props like value, onChange, onBlur from React Hook Form
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          sx={{
            borderRadius: `${borderRadius}px`,
            "& fieldset": { borderColor: "text.secondary" },
            "& input": { padding: padding },
          }}
        />
        {hasError && <FormHelperText>{validationError}</FormHelperText>}
      </FormControl>
    </Stack>
  );
};

export default RoundedPasswordInput;
