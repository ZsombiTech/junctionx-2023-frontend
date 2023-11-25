import axios from "../config/axios";

export const getDemandForUserApi = async () => {
  try {
    const response = await axios.get("/v1/demands");
    return response;
  } catch (error: any) {
    return error;
  }
};
