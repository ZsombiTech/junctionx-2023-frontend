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

export const patchAppointmentApi = async (
  appointment_id: number,
  data: any
) => {
  try {
    const response = await axios.patch(
      `/v1/appointments/${appointment_id}`,
      data
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export const addNewMaintenanceApi = async (data: any) => {
  try {
    const response = await axios.post(`/v1/maintenances`, data);
    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteAppointmentApi = async (appointment_id: number) => {
  try {
    const response = await axios.delete(`/v1/appointments/${appointment_id}`);
    return response;
  } catch (error: any) {
    return error;
  }
};
