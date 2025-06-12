import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import LoginImg from "../assets/login-img.svg";
import RegisterImg from "../assets/register-img.svg";

import TabItem from "./TabItem";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { Image } from "../../../components/UI/Image";
import { Stack } from "@mui/material";

const AuthLayout: React.FC = () => {
  const { pathname: activeRoute } = useLocation();

  if (localStorage.getItem("token")) {
    // Redirect to home if user is already logged in
    return <Navigate to="/" />;
  }

  const isOnLoginPage = activeRoute === "/account/login";
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          marginTop: 3,
          maxWidth: "1100px",
        }}
      >
        <Grid container columns={10} sx={{}}>
          <Grid
            size={5}
            sx={{
              display: { xs: "none", lg: "flex" },
            }}
          >
            <Image
              src={isOnLoginPage ? LoginImg : RegisterImg}
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 10, lg: 5 }}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              alignSelf: { lg: "flex-start" },
              px: 4,
              py: 2,
            }}
          >
            {/* Nav */}
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={0.4}
                sx={{ mb: 1 }}
              >
                <Image
                  src="/logo/logo.png"
                  sx={{ height: "32px", width: "auto", mb: "4px" }}
                />
              </Stack>
              <Box
                sx={{
                  backgroundColor: "primary.extraLight",
                  padding: "9px 13px",
                  borderRadius: "33px",
                  display: "inline-flex",
                }}
              >
                <Link to="login">
                  <TabItem isActive={isOnLoginPage}>Login</TabItem>
                </Link>
                <Link to="register">
                  <TabItem isActive={!isOnLoginPage}>Register</TabItem>
                </Link>
              </Box>
            </Box>

            {/* form */}
            <Outlet />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AuthLayout;
