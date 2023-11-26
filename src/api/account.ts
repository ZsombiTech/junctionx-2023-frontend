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

export const deleteAccountApi = async (account_id: number) => {
  try {
    const response = await axios.delete(`/v1/accounts/${account_id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};
