import  api  from "../lib/axios";

export const getLeads = async (
  search = "",
  status = ""
) => {
  const response = await api.get(
    `/leads?search=${search}&status=${status}`
  );

  return response.data.data.leads;
};

export const createLead = async (
  leadData: {
    name: string;
    email: string;
    company: string;
    status: string;
  }
) => {
  const response = await api.post(
    "/leads",
    leadData
  );

  return response.data.data;
};

export const updateLeadStatus = async (
  leadId: string,
  status: string
) => {
  const response = await api.patch(
    `/leads/${leadId}`,
    { status }
  );

  return response.data.data;
};

export const deleteLead = async (
  leadId: string
) => {
  const response = await api.delete(
    `/leads/${leadId}`
  );

  return response.data;
};