import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  Radio,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export type RatingOption = {
  value: number;
  label: string;
  count?: number;
};

type RatingFilterDropdownProps = {
  options: RatingOption[];
  value: number | null;
  onChange: (value: number | null) => void;
  label?: string;
};

const renderStars = (value: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<StarIcon key={i} fontSize="small" />);
    } else if (value >= i - 0.5) {
      stars.push(<StarHalfIcon key={i} fontSize="small" />);
    } else {
      stars.push(<StarBorderIcon key={i} fontSize="small" />);
    }
  }
  return (
    <Box
      component="span"
      sx={{ color: "#f59e42", mr: 1, display: "inline-flex" }}
    >
      {stars}
    </Box>
  );
};

const RatingFilterDropdown: React.FC<RatingFilterDropdownProps> = ({
  options,
  value,
  onChange,
  label = "Rating",
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (newValue: number) => {
    onChange(newValue);
    handleClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    handleClose();
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const buttonLabel = selectedOption ? selectedOption.label : label;

  return (
    <>
      <Button
        variant="outlined"
        disableRipple
        onClick={handleOpen}
        endIcon={
          openMenu ? (
            <ArrowDropUp
              sx={{
                color: "var(--mui-palette-action-active)",
                fontSize: "1.5rem",
              }}
            />
          ) : (
            <ArrowDropDown
              sx={{
                color: "var(--mui-palette-action-active)",
                fontSize: "1.5rem",
              }}
            />
          )
        }
        sx={{
          borderRadius: "20px",
          borderWidth: "1px",
          borderColor:
            "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23);",
          textTransform: "none",
          fontWeight: 500,
          background: "#fff",
          padding: "8.5px 14px",
          lineHeight: "1.5rem",

          color: "text.primary",

          "&:hover": {
            borderColor: "text.primary",
          },
        }}
      >
        {buttonLabel}

        {/* Badge */}
        {value !== null && (
          <Box
            sx={{
              backgroundColor: "primary.extraLight",
              borderRadius: "50%",
              width: 24,
              height: 24,
              textAlign: "center",
              ml: 0.5,
            }}
          >
            <Typography component="span" fontWeight={600} color="primary">
              1
            </Typography>
          </Box>
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 3, minWidth: 260, maxHeight: 320 },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            dense
            sx={{ borderRadius: 2, py: 0, px: 0.5 }}
          >
            <Radio
              checked={value === option.value}
              value={option.value}
              tabIndex={-1}
              disableRipple
              size="small"
            />
            {renderStars(option.value)}
            <Typography fontWeight={500} sx={{ mr: 0.5 }}>
              {option.label}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              ({option.count})
            </Typography>
          </MenuItem>
        ))}

        <Stack
          direction={"row"}
          onMouseDown={handleClear}
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
      </Menu>
    </>
  );
};

export default RatingFilterDropdown;
