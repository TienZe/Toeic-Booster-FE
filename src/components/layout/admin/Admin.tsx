import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { authActions, AuthState } from "../../../stores/authSlice";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import { Logout } from "@mui/icons-material";
import Link from "../../UI/Link";

const Admin = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const collapsed = false;
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "100vh !important",
          background: "#f0f0f0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SideBar collapsed={collapsed} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            py: 2,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Link to="/profile">
              <Avatar
                src={user?.avatar || DefaultAvatar}
                sx={{ display: "inline-block", width: "50px", height: "50px" }}
              />
            </Link>
            <Typography sx={{ marginBottom: 1, marginTop: 0.25 }}>
              {collapsed ? " " : user?.name}
            </Typography>

            <Button
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                color: "secondary.main",
                "& .MuiButton-icon": {
                  marginRight: collapsed ? 0 : "8px",
                },
              }}
            >
              {!collapsed && "Logout"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Stack>
          <Box
            sx={{
              pt: 0.5,
              px: 1,
              minHeight: "100vh",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Admin;
