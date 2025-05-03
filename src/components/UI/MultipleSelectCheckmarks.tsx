import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, Stack, SxProps, Typography } from "@mui/material";
import InputProps from "../../types/UI/InputProps";

const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    },
  },
};

export interface MultipleSelectCheckmarksRef {
  reset: () => void;
}

interface MultipleSelectCheckmarksProps
  extends InputProps<Array<string | number>> {
  itemLabels: Array<string | number>;
  itemValues: Array<string | number>;
  bootstrapSelect?: boolean;
  formControlSx?: SxProps;
  onChange?: (newValue: Array<string | number>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const MultipleSelectCheckmarks: React.FC<MultipleSelectCheckmarksProps> = ({
  label,
  itemLabels,
  itemValues,
  bootstrapSelect = false,
  formControlSx,
  onChange,
  onBlur,
  gap = 0.5,
  value,
  validationError,
}) => {
  const hasError = Boolean(validationError);
  const handleChange = (event: SelectChangeEvent<Array<string | number>>) => {
    const {
      target: { value: newValues },
    } = event;
    // console.log("handleChange: newValues", newValues);
    onChange?.(newValues as Array<string | number>);
  };

  const handleClearFilter = () => {
    onChange?.([]);
  };

  return (
    <FormControl sx={{ rowGap: gap, ...formControlSx }} error={hasError}>
      {bootstrapSelect ? (
        <Typography component="label">{label}</Typography>
      ) : (
        <InputLabel>{label}</InputLabel>
      )}

      <Select<Array<string | number>>
        multiple
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        input={<OutlinedInput label={bootstrapSelect ? undefined : label} />}
        renderValue={(selected) => {
          const selectedLabels = selected.map((value) => {
            const index = itemValues.indexOf(value);
            return itemLabels[index];
          });

          return selectedLabels.join(", ");
        }}
        MenuProps={MenuProps}
      >
        {itemLabels.map((label, index) => (
          <MenuItem
            key={label}
            value={itemValues[index]}
            sx={{ py: 0, px: 0.5 }}
          >
            <Checkbox checked={value?.includes(itemValues[index])} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}

        <Stack
          direction={"row"}
          onMouseDown={handleClearFilter}
          sx={{
            fontWeight: 600,
            color: "primary.main",
            py: 0,
            px: 0.5,
            display: "flex",
            alignItems: "center",
            minHeight: "42px",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: 18,
              width: "42px",
              textAlign: "center",
            }}
          >
            ×
          </span>
          Clear
        </Stack>
      </Select>

      {hasError && <FormHelperText>{validationError}</FormHelperText>}
    </FormControl>
  );
};

export default MultipleSelectCheckmarks;
