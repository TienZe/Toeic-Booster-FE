import {
  Select,
  SelectProps,
  Stack,
  Typography,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { forwardRef } from "react";

interface BootstrapSelectProps {
  itemLabels: string[];
  itemValues: Array<string | number | undefined>;
  gap?: number;
  requiredSign?: boolean;
  validationError?: string;
}

const BootstrapSelect = forwardRef<
  HTMLInputElement,
  BootstrapSelectProps & SelectProps
>((props, ref) => {
  const {
    itemLabels,
    itemValues,
    gap = 0.5,
    label,
    requiredSign = false,
    validationError,
    ...rest
  } = props;

  const { sx, ...otherProps } = rest;

  return (
    <Stack spacing={gap}>
      <Typography component="label" htmlFor={props.id}>
        {label}
        {requiredSign && (
          <Typography color="error" component="span">
            *
          </Typography>
        )}
      </Typography>
      <Select
        {...otherProps}
        inputRef={ref}
        displayEmpty // the renderValue will still be called event if the value is undefined,
        // so we have change to show meaningful label
        renderValue={(value) => {
          const labelIndex = itemValues.indexOf(value as string | number);
          return itemLabels[labelIndex];
        }}
        size="small"
        sx={{
          ...sx,
        }}
      >
        {itemLabels.map((label, index) => (
          <MenuItem key={index} value={itemValues[index]}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {validationError && <FormHelperText>{validationError}</FormHelperText>}
    </Stack>
  );
});

export default BootstrapSelect;
