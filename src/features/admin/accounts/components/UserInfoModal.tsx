import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../../components/UI/CustomModal";
import { User, UserStatus } from "../../../../types/auth";
import { AddAPhoto } from "@mui/icons-material";
import PasswordTextField from "../../../../components/UI/PasswordTextField";
import UserStatusLegend from "./UserStatusLegend";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, updateUser } from "../api/user-api";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { AdminUpdateUserRequest } from "../types/Request";
import { SubmitHandler, useForm } from "react-hook-form";
import { validateEmail } from "../../../../utils/helper";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import useFileInput from "../../../../hooks/useFileInput";

interface UserInfoModalProps {
  modal: CustomModalProps;
  defaultUser: User; // the initial user data for form
}

type FormData = {
  email: string;
  name: string;
  newPassword: string;
  newPasswordConfirmation: string;
  status: UserStatus;
};

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  modal: { onClose: onCloseModal, ...modalProps },
  defaultUser,
}) => {
  const queryClient = useQueryClient();
  const [openConfirmSwitchStatusModal, setOpenConfirmSwitchStatusModal] =
    useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [user, setUser] = useState<User>(defaultUser);
  const [hasChanged, setHasChanged] = useState(false);

  const {
    register,
    getValues,
    formState: { errors: validationErrors },
    handleSubmit,
    reset: resetForm,
  } = useForm<FormData>({
    defaultValues: {
      email: defaultUser.email || "",
      name: defaultUser.name || "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });

  const { fileInputRef, fileSrc, handleChangeFileInput, chooseFile } =
    useFileInput(user.avatar || "");

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (newUserData: User) => {
      toast.success("User information has been updated!");
      setUser(newUserData);
      setHasChanged(true);
      setOpenConfirmSwitchStatusModal(false);
    },
    onError: (error) => {
      toast.error(capitalizeFirstLetter(error.message[0]));
    },
    onSettled: () => {
      updateUserMutation.reset();
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User has been deleted!");
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(capitalizeFirstLetter(error.message[0]));
    },
    onSettled: () => {
      setOpenDeleteModal(false);
      deleteUserMutation.reset();
    },
  });

  const handleConfirmSwitchStatus = () => {
    if (!user) return;

    updateUserMutation.mutate({
      userId: user.id,
      status:
        user.status == UserStatus.Active
          ? UserStatus.Inactive
          : UserStatus.Active,
    });
  };

  const handleCloseModal = () => {
    onCloseModal();
    if (hasChanged) {
      console.log("invalidate users");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  };

  const handleSaveChanges: SubmitHandler<FormData> = (data) => {
    if (!user) return;

    const request: AdminUpdateUserRequest = {
      userId: user.id,
    };

    let needToMutate = false;

    if (data.name !== user.name) {
      request.name = data.name;
      needToMutate = true;
    }

    // if (data.email !== user.email) {
    //   request.email = data.email;
    //   needToMutate = true;
    // }

    if (fileSrc && fileSrc !== user.avatar) {
      request.avatar = fileSrc;
      needToMutate = true;
    }

    if (needToMutate) {
      updateUserMutation.mutate(request);
    }

    // Check whether need to update password
    const needToUpdatePassword =
      data.newPassword !== "" && data.newPasswordConfirmation !== "";
    if (needToUpdatePassword) {
      const updatePasswordRequest: AdminUpdateUserRequest = {
        userId: user.id,
        newPassword: data.newPassword,
        newPasswordConfirmation: data.newPasswordConfirmation,
      };

      updateUserMutation.mutate(updatePasswordRequest);
    }

    if (!(needToMutate || needToUpdatePassword)) {
      toast.info("No changes to save!");
    }
  };

  const handleDeleteUser = () => {
    if (!user) return;

    deleteUserMutation.mutate(user.id);
  };

  useEffect(() => {
    setUser(defaultUser);
    setHasChanged(false);
  }, [defaultUser]);

  useEffect(() => {
    if (user) {
      resetForm({
        email: user.email,
        name: user.name,
        newPassword: "",
        newPasswordConfirmation: "",
        status: user.status,
      });
    }
  }, [resetForm, user]);

  return (
    <div id="user-info-modal">
      <CustomModal {...modalProps} onClose={handleCloseModal}>
        <Box
          sx={{
            minWidth: "900px",
            py: 0.5,
            "& .MuiTextField-root": {
              width: "100%",
            },

            "& .MuiInputBase-input": {
              py: "14px",
            },
          }}
        >
          {/* Header */}
          <Box sx={{ padding: 1.5, paddingBottom: 1 }}>
            <Typography variant="h5">User Information</Typography>
          </Box>
          <Divider />

          {/* User info */}
          <Box sx={{ padding: 1.5 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={fileSrc}
                    sx={{ width: "80px", height: "80px" }}
                  />
                  <input
                    type="file"
                    hidden
                    name="avatar"
                    ref={fileInputRef}
                    onChange={handleChangeFileInput}
                  />
                  <IconButton
                    onClick={chooseFile}
                    sx={{
                      width: "24px",
                      height: "24px",
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
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                  <Chip
                    label={"ID: " + user.id}
                    sx={{
                      py: "12px",
                      px: "6px",
                      borderRadius: "20px",
                      marginTop: 0.5,
                    }}
                  />
                </Box>
              </Stack>

              {/* Account status */}
              <Box>
                <FormGroup
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenConfirmSwitchStatusModal(true);
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        color="success"
                        checked={user.status == UserStatus.Active}
                      />
                    }
                    label="Account status"
                    labelPlacement="start"
                  />
                </FormGroup>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="end"
                  sx={{ textAlign: "right", marginTop: "-4px" }}
                >
                  <UserStatusLegend label="Active" color="success.main" />
                  <UserStatusLegend label="Disabled" color="divider" />
                </Stack>

                <Typography
                  variant="body2"
                  sx={{ marginTop: 0.5, textAlign: "right" }}
                >
                  Created at{" "}
                  {user.createdAt &&
                    format(new Date(user.createdAt), "dd/MM/y")}
                </Typography>
              </Box>
            </Stack>

            <Grid2
              container
              rowSpacing={1}
              columnSpacing={1}
              sx={{
                marginTop: 2,
              }}
            >
              <Grid2 size={6}>
                <TextField
                  label="Email"
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) =>
                      validateEmail(value) ||
                      "Please enter a valid email format",
                  })}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email?.message}
                />
              </Grid2>
              <Grid2 size={6}></Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Full name"
                  error={!!validationErrors.name}
                  helperText={validationErrors.name?.message}
                  {...register("name", { required: "Name is required" })}
                />
              </Grid2>
            </Grid2>
          </Box>
          <Divider />

          {/* <Box sx={{ padding: 1.5, paddingTop: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Role
            </Typography>
            <Typography variant="body1">
              Select the appropriate role for the user from the options below
              (be cautious with updating role to admin).
            </Typography>

            <FormControl sx={{ marginTop: 0.5 }}>
              <RadioGroup
                row
                onChange={(e) => setUpdatedRole(e.target.value as RoleEnum)}
                value={getRole(user)}
                sx={{ columnGap: 1 }}
              >
                <FormControlLabel
                  value={RoleEnum.User}
                  control={<Radio size="small" />}
                  label="Student"
                />
                <FormControlLabel
                  value={RoleEnum.Admin}
                  control={<Radio size="small" />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider /> */}

          {/* Change password */}
          <Box sx={{ padding: 1.5, paddingTop: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Change password
            </Typography>
            <Grid2
              container
              rowSpacing={1}
              columnSpacing={1}
              sx={{
                marginTop: 0.5,
              }}
            >
              <Grid2 size={6}>
                <PasswordTextField
                  label="New password"
                  error={!!validationErrors.newPassword}
                  helperText={validationErrors.newPassword?.message}
                  register={register("newPassword", {
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </Grid2>
              <Grid2 size={6}>
                <PasswordTextField
                  label="Confirm new password"
                  error={!!validationErrors.newPasswordConfirmation}
                  helperText={validationErrors.newPasswordConfirmation?.message}
                  register={register("newPasswordConfirmation", {
                    validate: (value: string) =>
                      value === getValues("newPassword") ||
                      "Password does not match",
                  })}
                />
              </Grid2>
            </Grid2>
          </Box>
          <Divider />

          {/* Delete account */}
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Delete account?
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <div>
                <Typography variant="body1">
                  Deleting this account will permanently remove all data
                  associated with this account.
                </Typography>
                <Typography variant="body2">
                  (This action cannot be undone)
                </Typography>
              </div>
              <Button
                onClick={() => setOpenDeleteModal(true)}
                variant="outlined"
                color="error"
                sx={{ backgroundColor: "rgba(211, 47, 47, 0.04)", py: "4px" }}
              >
                Delete
              </Button>
            </Stack>
          </Box>

          <Box sx={{ px: 1.5, py: 1 }}>
            <Grid2
              container
              rowSpacing={1}
              columnSpacing={1}
              sx={{
                marginTop: 0.5,
              }}
            >
              <Grid2 size={6}>
                <Button
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="contained"
                  sx={{ width: "100%", boxShadow: "none" }}
                  onClick={handleSubmit(handleSaveChanges)}
                >
                  {updateUserMutation.isPending
                    ? "Please wait..."
                    : "Save changes"}
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </CustomModal>

      {/* Modal confirm switch status */}
      <CustomModal
        open={openConfirmSwitchStatusModal}
        onClose={() => setOpenConfirmSwitchStatusModal(false)}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Do you want to{" "}
            {user.status == UserStatus.Active ? "deactivate" : "activate"} this
            account?
          </Typography>
          {user.status == UserStatus.Active ? (
            <Typography>
              Deactivating the account will temporarily disable the user's
              access.
            </Typography>
          ) : (
            <Typography>
              By activating this account, the user will have full access to
              their features and services.
            </Typography>
          )}
          <Stack direction="row" spacing={0.5} sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              onClick={handleConfirmSwitchStatus}
              sx={{ boxShadow: "none", minWidth: "85px" }}
            >
              OK
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenConfirmSwitchStatusModal(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>

      {/* Modal confirm change role */}
      {/* <CustomModal open={!!updatedRole} onClose={() => setUpdatedRole(null)}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Do you want to change this user's role?
          </Typography>
          <Typography>
            Please note that changing the user's role may affect their access
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              onClick={handleChangeRole}
              sx={{ boxShadow: "none", minWidth: "85px" }}
            >
              OK
            </Button>
            <Button variant="outlined" onClick={() => setUpdatedRole(null)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal> */}

      {/* Delete modal */}
      <CustomModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      >
        <Box sx={{ padding: 2, maxWidth: "500px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Are you sure to delete this account?
          </Typography>
          <Typography>
            Deleting this account will permanently remove all data associated
            with this account.
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ marginTop: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
              sx={{ boxShadow: "none", minWidth: "85px" }}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "OK"}
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </div>
  );
};
export default UserInfoModal;
