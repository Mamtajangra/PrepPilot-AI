import api from "./api";

export const addStudyPlan = async (data) => {
  const response = await api.post("/calendar", data);
  return response.data;
};