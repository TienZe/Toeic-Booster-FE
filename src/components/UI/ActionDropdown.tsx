import React from "react";
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Link from "./Link";

export interface ActionDropdownAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  link?: string;
  danger?: boolean;
}

interface ActionDropdownProps {
  actions: ActionDropdownAction[];
  header?: string;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  actions,
  header = "Actions",
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: ActionDropdownAction) => {
    handleClose();
    action.onClick?.();
  };

  return (
    <>
      <Button
        variant={open ? "contained" : "text"}
        onClick={handleOpen}
        sx={{
          textAlign: "center",
          fontWeight: 500,
          minWidth: 180,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomLeftRadius: open ? 0 : 4,
          borderBottomRightRadius: open ? 0 : 4,
        }}
      >
        {header}
        <ExpandMore fontSize="small" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: open ? 0 : 4,
              borderTopRightRadius: open ? 0 : 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              minWidth: 180,
              maxWidth: 320,
              p: 0,
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {actions.map((action) => {
          const menuItem = (
            <MenuItem
              key={action.label}
              disableRipple={true}
              onClick={() => handleActionClick(action)}
              sx={{
                py: 0.5,
                px: 1,
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: "primary.extraLight",
                  color: "primary.main",
                  fontWeight: 700,
                },
                "& .MuiSvgIcon-root": {
                  color: "inherit",
                  fontSize: "20px",
                },
              }}
            >
              {action.icon && (
                <ListItemIcon sx={{ color: "inherit" }}>
                  {action.icon}
                </ListItemIcon>
              )}
              <Typography component="span" sx={{ color: "inherit" }}>
                {action.label}
              </Typography>
            </MenuItem>
          );

          return action.link ? (
            <Link to={action.link}>{menuItem}</Link>
          ) : (
            menuItem
          );
        })}
      </Menu>
    </>
  );
};

export default ActionDropdown;
