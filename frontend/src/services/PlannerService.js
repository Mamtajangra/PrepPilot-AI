import api from "./api";

// Create Planner
export const createPlanner = async (plannerData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/planner/", plannerData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get All Planners
export const getPlans = async () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);
  const response = await api.get("/planner/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Dashboard Statistics
export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/planner/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get Planner by ID
export const getPlannerById = async (plannerId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/planner/${plannerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update Planner
export const updatePlanner = async (plannerId, plannerData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/planner/${plannerId}`,
    plannerData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete Planner
export const deletePlanner = async (plannerId) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/planner/${plannerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//  save AI-generated plan
export const saveAIPlan = async (plan) => {
  const response = await api.post(
    "/planner/save-ai",
    plan
  );

  return response.data;
};