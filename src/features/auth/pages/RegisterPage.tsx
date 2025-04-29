import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import RoundedInput from "../../../components/UI/RoundedInput";
import RoundedPasswordInput from "../components/RoundedPasswordInput";
import { postRegister } from "../api/account-api";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import { Alert } from "@mui/material";

import { capitalizeFirstLetter } from "../../../utils/stringFormatter";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email format",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 6,
      message: "Name must be at least 6 characters long",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
  passwordConfirmation: {
    required: "Confirm password is required",
  },
};

const RegisterPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  console.log("errors", errors);

  const navigate = useNavigate();

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: postRegister,
    onSuccess: () => {
      navigate("/account/login");
      toast.success("Register successful! Please login to continue.");
    },
  });

  let errorMessages;
  if (isError && error && error.message) {
    errorMessages = (
      <Alert severity="error" onClose={() => reset()}>
        {capitalizeFirstLetter(error.message)}
      </Alert>
    );
  }

  const handleSubmitRegisterForm: SubmitHandler<FormData> = (data) => {
    console.log("Submit register form: ", data);
    mutate(data);
  };

  return (
    <>
      {isPending && <CustomBackdrop open />}

      <Stack sx={{ gap: 2, width: "100%" }}>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Create an account to start learning with us.
        </Typography>

        {isError && errorMessages}

        <form
          id="register-form"
          onSubmit={handleSubmit(handleSubmitRegisterForm)}
        >
          <Stack spacing={1}>
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field }) => (
                <RoundedInput
                  {...field}
                  label="Email"
                  placeholder="Enter your email"
                  validationError={errors.email?.message}
                  gap={0.4}
                  padding="8px 28px"
                  borderRadius={28}
                />
              )}
            />

            <Controller
              name="name"
              control={control}
              rules={validationRules.name}
              render={({ field }) => (
                <RoundedInput
                  {...field}
                  label="Name"
                  placeholder="Enter your name"
                  validationError={errors.name?.message}
                  gap={0.4}
                  padding="8px 28px"
                  borderRadius={28}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => (
                <RoundedPasswordInput
                  {...field}
                  label="Password"
                  placeholder="Enter your password"
                  validationError={errors.password?.message}
                  gap={0.4}
                  padding="8px 28px"
                  borderRadius={28}
                />
              )}
            />

            <Controller
              name="passwordConfirmation"
              control={control}
              rules={{
                ...validationRules.passwordConfirmation,
                validate: (value: string) =>
                  value === getValues("password") || "Password does not match",
              }}
              render={({ field }) => (
                <RoundedPasswordInput
                  {...field}
                  label="Confirm Password"
                  placeholder="Retype your password"
                  validationError={errors.passwordConfirmation?.message}
                  gap={0.4}
                  padding="8px 28px"
                  borderRadius={28}
                />
              )}
            />
          </Stack>
        </form>
        <Button
          type="submit"
          form="register-form"
          variant="contained"
          sx={{
            backgroundColor: "success.main",
            borderRadius: "32px",
            py: "6px",
            width: { xs: "100%", lg: "230px" },
            alignSelf: { lg: "flex-end" },
          }}
        >
          Start Learning
        </Button>
      </Stack>
    </>
  );
};

export default RegisterPage;
