import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowLeft,
  BarChart,
  Logout,
  Person,
} from "@mui/icons-material";

import CustomNavLink from "../UI/NavLink";
import Logo from "../../assets/logos/logo.svg";
import { AppDispatch, RootState } from "../../stores";
import DefaultAvatar from "../../assets/avatars/default.svg";
import { authActions, AuthState } from "../../stores/authSlice";
import PinIcon from "../UI/PinIcon";
import AdminIcon from "../UI/AdminIcon";
import { canAccessAdminPage } from "../../types/auth";

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector<RootState, AuthState>(
    (state) => state.auth,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "white",
      }}
    >
      <Toolbar
        sx={{
          px: { xl: 4 },
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={Logo} />
          </Link>
          <Stack direction="row">
            <NavLink to="/">
              {({ isActive }) => (
                <CustomNavLink isActive={isActive}>Home</CustomNavLink>
              )}
            </NavLink>
            <NavLink to="/voca">
              {({ isActive }) => (
                <CustomNavLink isActive={isActive}>Vocab Boost</CustomNavLink>
              )}
            </NavLink>
            <NavLink to="/exams">
              {({ isActive }) => (
                <CustomNavLink isActive={isActive}>
                  TOEIC Practice
                </CustomNavLink>
              )}
            </NavLink>
            {/* <NavLink to="/listen">
              {({ isActive }) => (
                <CustomNavLink isActive={isActive}>
                  Listen Practice
                </CustomNavLink>
              )}
            </NavLink> */}
          </Stack>
        </Stack>

        {isAuthenticated ? (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            color="secondary.main"
          >
            <Typography>{user?.name}</Typography>
            <Stack
              color="text.primary"
              direction="row"
              alignItems="center"
              sx={{ cursor: "pointer", py: 0.5 }}
              onClick={handleOpenMenu}
            >
              <Avatar src={user?.avatar || DefaultAvatar} />
              {open ? <ArrowDropDown /> : <ArrowLeft />}
            </Stack>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                width: 240,
                maxWidth: "100%",
                "& .MuiMenu-list > ul:focus-visible": { outline: "none" },
              }}
            >
              <MenuList
                sx={{ "& a": { textDecoration: "none", color: "inherit" } }}
              >
                <Link to="/profile">
                  <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                </Link>

                <Link to="/history">
                  <MenuItem>
                    <ListItemIcon>
                      <BarChart fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Practice Analytics</ListItemText>
                  </MenuItem>
                </Link>

                <Link to="/personal-word-folder">
                  <MenuItem>
                    <ListItemIcon>
                      <PinIcon sx={{ fontSize: "20px" }} />
                    </ListItemIcon>
                    <ListItemText>Word Folders</ListItemText>
                  </MenuItem>
                </Link>

                {user && canAccessAdminPage(user) && (
                  <Link to="/admin">
                    <MenuItem>
                      <ListItemIcon>
                        <AdminIcon sx={{ fontSize: "20px" }} />
                      </ListItemIcon>
                      <ListItemText>Admin Dashboard</ListItemText>
                    </MenuItem>
                  </Link>
                )}

                <Divider sx={{ margin: "8px !important" }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              sx={{
                color: "text.primary",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => navigate("/account/register")}
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              sx={{ px: "20px" }}
              onClick={() => navigate("/account/login")}
            >
              Log In
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
