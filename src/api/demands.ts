import axios from "../config/axios";

export const getDemandForUserApi = async () => {
  try {
    const response = await axios.get("/v1/demands");
    return response;
  } catch (error: any) {
    return error;
  }
};

export const createNewDemandApi = async (data: any) => {
  try {
    const response = await axios.post("/v1/demands", data);
    return response;
  } catch (error: any) {
    return error;
  }
};
