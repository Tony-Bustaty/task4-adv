import type { AuthResponse, LoginPayload, SignUpPayload } from "../../types/interfaces";
import { apiClient } from "../client";


export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/login", payload),

  register: (payload: SignUpPayload) => {
    const formData = new FormData();
    formData.append("first_name", payload.firstName);
    formData.append("last_name", payload.lastName);
    formData.append("user_name", payload.firstName+"_"+ payload.lastName);
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("password_confirmation", payload.confirmPassword);
    if (payload.profileImage) formData.append("profile_image", payload.profileImage);

    return apiClient.post<AuthResponse>("/register", formData);
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    return apiClient.post("/auth/logout");
  },
};