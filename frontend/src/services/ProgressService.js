import api from "./api";

export const getProgress = async () => {
  const response = await api.get("/planner/dashboard");
  return response.data;
};