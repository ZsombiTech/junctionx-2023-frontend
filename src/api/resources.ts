import axios from "../config/axios";

export const getAllResourcesApi = async () => {
  try {
    const response = await axios.get("/v1/resources");
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getStatisticsApi = async () => {
  try {
    const response = await axios.get("/v1/statistics");
    return response;
  } catch (error: any) {
    return error;
  }
};
