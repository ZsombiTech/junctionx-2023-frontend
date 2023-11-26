import axios from "../config/axios";

export const getFullCalendarApi = async () => {
  try {
    const response = await axios.get("/v1/debug/calendar");
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getAppointmentApi = async (appointment_id: number) => {
  try {
    const response = await axios.get(`/v1/appointments/${appointment_id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getUpcomingApi = async () => {
  try {
    const response = await axios.get(`/v1/upcoming`);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getLogsApi = async () => {
  try {
    const response = await axios.get(`/v1/logs`);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteLogsApi = async () => {
  try {
    const response = await axios.delete(`/v1/logs`);
    return response;
  } catch (error: any) {
    return error;
  }
};
