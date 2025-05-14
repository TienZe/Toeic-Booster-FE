import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  FormHelperText,
  MenuProps,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import InputProps from "../../types/UI/InputProps";

const ITEM_HEIGHT = 42;
const ITEM_PADDING_TOP = 8;

type LabelType = "bootstrap" | "mui" | "inside";

interface MultipleSelectCheckmarksProps
  extends InputProps<Array<string | number>> {
  itemLabels: Array<string | number>;
  itemValues: Array<string | number>;
  formControlSx?: SxProps;
  onChange?: (newValue: Array<string | number>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  menuProps?: Partial<MenuProps>;
  menuWidth?: string;
  sx?: SxProps;
  labelType?: LabelType;
}

function getLabel(labelType: LabelType, label: string) {
  if (labelType === "bootstrap") {
    return <Typography component="label">{label}</Typography>;
  } else if (labelType === "mui") {
    return <InputLabel>{label}</InputLabel>;
  } else {
    return null;
  }
}

const MultipleSelectCheckmarks: React.FC<MultipleSelectCheckmarksProps> = ({
  label,
  itemLabels,
  itemValues,
  formControlSx,
  onChange,
  onBlur,
  gap = 0.5,
  value,
  validationError,
  menuProps,
  menuWidth,
  sx,
  labelType = "mui",
}) => {
  const hasError = Boolean(validationError);
  const handleChange = (event: SelectChangeEvent<Array<string | number>>) => {
    const {
      target: { value: newValues },
    } = event;
    // console.log("handleChange: newValues", newValues);
    onChange?.(newValues as Array<string | number>);
  };

  const handleClearValue = () => {
    onChange?.([]);
  };

  return (
    <FormControl
      sx={{
        rowGap: gap,
        ...formControlSx,

        ...(labelType === "inside" && {
          "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor:
              "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23);",
          },
        }),
      }}
      error={hasError}
    >
      {getLabel(labelType, label)}

      <Select<Array<string | number>>
        multiple
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        input={
          <OutlinedInput label={labelType === "mui" ? label : undefined} />
        }
        renderValue={(selected) => {
          console.log("selected", selected);
          if (labelType === "inside") {
            if (selected.length === 0) {
              return label;
            }

            if (selected.length === 1) {
              return itemLabels[itemValues.indexOf(selected[0])];
            } else {
              return (
                <Stack direction="row" gap={0.5}>
                  <Typography component="span" fontWeight={500}>
                    {label}
                  </Typography>
                  {/* Badge */}
                  <Box
                    sx={{
                      backgroundColor: "primary.extraLight",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      component="span"
                      fontWeight={600}
                      color="primary"
                    >
                      {selected.length}
                    </Typography>
                  </Box>
                </Stack>
              );
            }
          }

          const selectedLabels = selected.map((value) => {
            const index = itemValues.indexOf(value);
            return itemLabels[index];
          });

          return selectedLabels.join(", ");
        }}
        MenuProps={{
          ...menuProps,
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
              width: menuWidth,
            },
          },
        }}
        sx={sx}
      >
        {itemLabels.map((label, index) => (
          <MenuItem
            key={label}
            value={itemValues[index]}
            sx={{ py: 0, px: 0.5 }}
          >
            <Checkbox
              checked={value?.includes(itemValues[index])}
              size="small"
            />
            <ListItemText primary={label} />
          </MenuItem>
        ))}

        <Stack
          direction={"row"}
          onMouseDown={handleClearValue}
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
