import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Content from "../../../components/layout/Content";

import UserProfileBackground from "../assets/user-profile-background.png";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import { AddAPhoto } from "@mui/icons-material";
import useFileInput from "../../../hooks/useFileInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";
import TabPanel from "../../../components/UI/TabPanel";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updatePassword, updateUserProfile } from "../api/user-profile";
import { me } from "../../auth/api/account-api";
import PasswordTextField from "../../../components/UI/PasswordTextField";

type ProfileFormData = {
  name: string;
  email?: string;
};

type ChangePasswordFormData = {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

const UserProfilePage: React.FC = () => {
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState(0);

  const { isAuthenticated, token } = useSelector<RootState, AuthState>(
    (state) => state.auth,
  );

  const profileForm = useForm<ProfileFormData>({
    defaultValues: { name: "", email: "" },
  });

  const [name] = profileForm.watch(["name"]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: isAuthenticated,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUser) => {
      toast.success("Your profile/avatar has been updated");
      queryClient.setQueryData(["user"], updatedUser);

      // reset state
      updateProfileMutation.reset();
    },
  });

  const changePasswordForm = useForm<ChangePasswordFormData>({
    defaultValues: { currentPassword: "", password: "", passwordConfirm: "" },
  });

  const changePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Your password has been updated");

      // reset mutation state
      changePasswordMutation.reset();
      changePasswordForm.reset({
        currentPassword: "",
        password: "",
        passwordConfirm: "",
      });
    },
  });

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSaveProfile: SubmitHandler<ProfileFormData> = (data) => {
    const request: Record<string, unknown> = {};
    if (data.name !== user?.name) {
      request.name = data.name;
    }

    updateProfileMutation.mutate(request);
  };

  const handleSaveChangePassword: SubmitHandler<ChangePasswordFormData> = (
    data,
  ) => {
    changePasswordMutation.mutate(data);
  };

  const {
    fileSrc,
    setFileSrc,
    handleChangeFileInput,
    fileInputRef,
    chooseFile,
  } = useFileInput(DefaultAvatar);

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
      });

      setFileSrc(user.avatar || DefaultAvatar);
    }
  }, [user, setFileSrc, profileForm]);

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFileInput(event, (newFileSrc) => {
      updateProfileMutation.mutate({ avatar: newFileSrc });
    });
  };

  return (
    <Content>
      <Box sx={{ px: 2, maxWidth: "840px", mx: "auto" }}>
        <Box sx={{ position: "relative" }}>
          <img src={UserProfileBackground} />
          <Box
            sx={{
              position: "absolute",
              bottom: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Avatar
              src={fileSrc}
              sx={{
                width: "120px",
                height: "120px",
                border: "3px solid white",
              }}
            />
            <IconButton
              onClick={chooseFile}
              sx={{
                width: "35px",
                height: "35px",
                boxShadow: 3,
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <AddAPhoto sx={{ fontSize: 16 }} />
            </IconButton>
            <input
              type="file"
              hidden
              name="avatar"
              ref={fileInputRef}
              onChange={handleChangeAvatar}
            />
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              {user?.name}
            </Typography>
          </Box>
        </Box>
        <Paper
          elevation={1}
          sx={{
            marginTop: 7,
            minHeight: "200px",
            padding: 1,
          }}
        >
          <>
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              sx={{ "& .MuiTab-root": { borderBottomWidth: 1 } }}
            >
              <Tab label="Profile" />
              <Tab label="Change Password" />
            </Tabs>
            <TabPanel value={tabIndex} index={0} sx={{ padding: "24px" }}>
              {isLoading ? (
                <DotLoadingProgress />
              ) : (
                <Grid2
                  container
                  spacing={2}
                  sx={{ "& .MuiTextField-root": { width: "100%" } }}
                >
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      label={"Name"}
                      variant="standard"
                      value={name}
                      error={!!profileForm.formState.errors.name}
                      helperText={profileForm.formState.errors.name?.message}
                      {...profileForm.register("name", {
                        required: "Name is required",
                      })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      label={"Email"}
                      variant="standard"
                      value={profileForm.getValues("email")}
                      disabled
                      slotProps={{
                        input: {
                          readOnly: true,
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <Button
                      variant="contained"
                      onClick={profileForm.handleSubmit(handleSaveProfile)}
                      sx={{ px: 3, height: "40px" }}
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </Grid2>
                </Grid2>
              )}
            </TabPanel>
            <TabPanel value={tabIndex} index={1} sx={{ padding: "24px" }}>
              <Grid2
                container
                spacing={2}
                sx={{ "& .MuiTextField-root": { width: "100%" } }}
              >
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <PasswordTextField
                    label={"Current Password"}
                    variant="standard"
                    error={
                      !!changePasswordForm.formState.errors.currentPassword
                    }
                    helperText={
                      changePasswordForm.formState.errors.currentPassword
                        ?.message
                    }
                    register={changePasswordForm.register("currentPassword", {
                      required: "You must provide your current password",
                    })}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <PasswordTextField
                    label={"New Password"}
                    variant="standard"
                    error={!!changePasswordForm.formState.errors.password}
                    helperText={
                      changePasswordForm.formState.errors.password?.message
                    }
                    register={changePasswordForm.register("password", {
                      required: "New password is required",
                    })}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <PasswordTextField
                    variant="standard"
                    label="Confirm Password"
                    register={changePasswordForm.register("passwordConfirm", {
                      required: "Confirm your new password!",
                      validate: (value: string) =>
                        value === changePasswordForm.getValues("password") ||
                        "Password does not match",
                    })}
                    error={
                      !!changePasswordForm.formState.errors.passwordConfirm
                    }
                    helperText={
                      changePasswordForm.formState.errors.passwordConfirm
                        ?.message
                    }
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Button
                    variant="contained"
                    onClick={changePasswordForm.handleSubmit(
                      handleSaveChangePassword,
                    )}
                    sx={{ px: 3, height: "40px" }}
                    disabled={changePasswordMutation.isPending}
                  >
                    {changePasswordMutation.isPending ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Change"
                    )}
                  </Button>
                </Grid2>
              </Grid2>
            </TabPanel>
          </>
        </Paper>
      </Box>
    </Content>
  );
};

export default UserProfilePage;
