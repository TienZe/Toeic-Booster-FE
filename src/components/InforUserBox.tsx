import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../stores";
import { AuthState } from "../stores/authSlice";
import { me } from "../features/auth/api/account-api";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { differenceInDays, format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import CustomBackdrop from "./UI/CustomBackdrop";
import DefaultAvatar from "../assets/avatars/default.svg";

const InforUserBox = () => {
  const navigate = useNavigate();
  const { token } = useSelector<RootState, AuthState>((state) => state.auth);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
  });

  const getDefaultTestDate = useCallback(() => {
    let createdDate = new Date();
    if (user) {
      createdDate = new Date(user.createdAt);
    }
    const defaultTestDate = createdDate;
    defaultTestDate.setMonth(defaultTestDate.getMonth() + 3);

    return defaultTestDate;
  }, [user]);

  const userTestDate = useMemo(() => {
    return user?.testDate ? new Date(user.testDate) : getDefaultTestDate();
  }, [user?.testDate, getDefaultTestDate]);

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open />
      ) : (
        <Box>
          <Box sx={{ mb: 1 }}>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <span style={{ width: "50px", height: "auto" }}>
                <img src={user?.avatar ?? DefaultAvatar} />
              </span>
              <Typography>{user?.name}</Typography>
            </Stack>
          </Box>

          <Divider />

          <Box sx={{ mt: 1 }}>
            <Stack direction="column" spacing={0.5}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography>Days until exam</Typography>
                <Typography color="secondary.dark" fontWeight="bold">
                  {`${differenceInDays(userTestDate, new Date())} days`}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography>Exam day</Typography>
                <Typography color="secondary.dark" fontWeight="bold">
                  {format(userTestDate, "dd/MM/yyyy")}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography>Target score</Typography>
                <Typography color="secondary.dark" fontWeight="bold">
                  {user?.targetScore ?? "450"}
                </Typography>
              </Stack>
              <Box sx={{ pt: 0.5 }}>
                <Link to="/toeic-statistics">
                  <Button
                    variant="contained"
                    onClick={() => navigate("/history")}
                    sx={{ boxShadow: "none", width: "100%" }}
                  >
                    Analysis your result
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default InforUserBox;
