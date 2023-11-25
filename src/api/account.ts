import axios from "../config/axios";

export const getMeApi = async () => {
  try {
    const response = await axios.get("/v1/accounts/me");
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getAllAccountsApi = async () => {
  try {
    const response = await axios.get("/v1/accounts");
    return response;
  } catch (error: any) {
    return error;
  }
};
