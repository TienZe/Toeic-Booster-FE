import axios from "../../../axios";
import { User } from "../../../types/auth";
import ApiResponse from "../../../types/ApiResponse";
import LoginRequest from "../types/LoginRequest";
import LoginResponse from "../types/LoginResponse";
import RegisterRequest from "../types/RegisterRequest";
import { ResetPasswordRequest } from "../types/ResetPasswordRequest";

export async function postLogin(request: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    request,
  );

  return response.data.data;
}

export async function postRegister(request: RegisterRequest) {
  const response = await axios.post("/auth/register", request);
  return response.data;
}

export async function me(token: string) {
  const response = await axios.get<ApiResponse<User>>(
    "/auth/me",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data.data;
}

export async function loginGoggle(accessToken: string) {
  const response = await axios.post("/auth/google", { token: accessToken });

  return response.data;
}

export async function forgotPassword(email: string) {
  const response = await axios.post("auth/forgotPassword", { email });

  return response.data;
}

export async function resetPassword(request: ResetPasswordRequest) {
  const { resetToken, ...data } = request;
  const response = await axios.patch("auth/resetPassword/" + resetToken, data);

  return response.data;
}
