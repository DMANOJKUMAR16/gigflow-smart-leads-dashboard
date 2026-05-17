import { api } from "../lib/axios";

export const getLeads = async () => {
  const response = await api.get("/leads");

  return response.data.data.leads;
};  