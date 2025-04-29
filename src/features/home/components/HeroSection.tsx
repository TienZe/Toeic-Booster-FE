import { Button, Container, Grid2, Stack, Typography } from "@mui/material";
import HightCurve from "../assets/highlight-curve.svg";
import IllusImage from "../assets/illus-img.png";
import TopDeco from "../assets/top-deco.svg";
import BottomDeco from "../assets/bot-deco.svg";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <Container fixed>
      <Grid2 container columns={7} spacing={2} sx={{ minHeight: "800px" }}>
        <Grid2
          size={{ xs: 7, lg: 4 }}
          display="flex"
          alignItems="center"
          sx={{ marginTop: { xs: 3, lg: 0 } }}
        >
          <Stack spacing={1.5}>
            <Typography
              variant="h1"
              color="secondary.dark"
              sx={{ fontSize: "3.5rem" }}
            >
              <Typography
                component="span"
                variant="inherit"
                color="primary.main"
              >
                {"Unlock "}
              </Typography>
              {"Your English "}
              <span style={{ position: "relative" }}>
                Potential
                <img
                  src={HightCurve}
                  style={{ position: "absolute", bottom: -10, left: 0 }}
                />
              </span>{" "}
              with Us
            </Typography>

            <Typography fontSize={18}>
              Welcome to our English Learning Website. Explore our features and
              enhance your vocabulary, TOEIC skills.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Link to="/account/login">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ px: 1.5, py: 0.75 }}
                >
                  Explore
                </Button>
              </Link>
              <Link to="/account/register">
                <Button
                  variant="outlined"
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    color: "text.primary",
                    borderColor: "text.primary",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2
          size={{ xs: 7, lg: 3 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: { xs: 5, lg: 0 }, marginBottom: { xs: 8, lg: 0 } }}
        >
          <div style={{ position: "relative" }}>
            <img src={IllusImage} />
            <img
              src={TopDeco}
              style={{
                position: "absolute",
                width: 212,
                height: 200,
                top: 0,
                right: 0,
                transform: "translate(30%, -50%)",
              }}
            />
            <img
              src={BottomDeco}
              style={{
                position: "absolute",
                width: 212,
                height: 200,
                bottom: 0,
                left: -20,
                transform: "translate(-50%, 50%)",
              }}
            />
          </div>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default HeroSection;
