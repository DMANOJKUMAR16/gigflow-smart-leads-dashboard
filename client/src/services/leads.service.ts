import { api } from "../lib/axios";

export const getLeads = async (
  search = "",
  status = ""
) => {
  const response = await api.get(
    `/leads?search=${search}&status=${status}`
  );

  return response.data.data.leads;
};