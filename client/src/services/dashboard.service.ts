import { api } from "../lib/axios";

export const getDashboardStats = async () => {
  const response = await api.get(
    "/leads/stats/overview"
  );

  return response.data.data;
};