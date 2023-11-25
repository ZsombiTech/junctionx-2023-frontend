import axios from "../config/axios";

export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post("/v1/auth/login", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const registerApi = async (data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  try {
    const response = await axios.post("/v1/auth/register", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const forgotPasswordApi = async (data: { email: string }) => {
  try {
    const response = await axios.post("/v1/auth/forgotpassword", data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await axios.get("/v1/auth/logout");
    return response;
  } catch (error: any) {
    return error;
  }
};
