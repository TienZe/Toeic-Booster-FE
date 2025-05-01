import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FormHelperText } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface MultipleSelectProps {
  itemLabels: string[];
  itemValues: Array<string | number>;
  validationError?: string;
  label: string;
  register?: UseFormRegisterReturn;
  onChange?: (newValue: Array<string | number>) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  itemLabels,
  itemValues,
  validationError,
  label,
  register,
  onChange,
}) => {
  const [values, setValues] = React.useState<Array<string | number>>([]);
  const [open, setOpen] = React.useState(false);

  const hasError = Boolean(validationError);

  const handleChange = (event: SelectChangeEvent<typeof values>) => {
    const {
      target: { value },
    } = event;
    console.log("selected values", value);
    const newValue = typeof value === "string" ? value.split(",") : value;
    setValues(newValue);

    onChange?.(newValue); // update form value
  };

  const handleDeleteItem = (itemToDelete: string | number) => {
    const newValues = values.filter((item) => item !== itemToDelete);

    console.log("Delete item, new values", newValues);
    setValues(newValues);

    onChange?.(newValues); // update form value
  };

  return (
    <FormControl error={hasError}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={register?.name}
        inputRef={register?.ref}
        multiple
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={values}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              "& .MuiChip-root": {
                "& .MuiChip-deleteIcon": {
                  color: "text.secondary",
                  "&:hover": {
                    color: "text.primary",
                  },
                },
              },
            }}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={itemLabels[itemValues.indexOf(value)]}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onDelete={(event) => {
                  event.stopPropagation();
                  handleDeleteItem(value);
                }}
              />
            ))}
          </Box>
        )}
      >
        {itemLabels.map((label, index) => (
          <MenuItem
            key={index}
            value={itemValues[index]}
            sx={{
              fontWeight: values.includes(itemValues[index])
                ? "medium"
                : "regular",
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{validationError}</FormHelperText>}
    </FormControl>
  );
};

export default MultipleSelect;
