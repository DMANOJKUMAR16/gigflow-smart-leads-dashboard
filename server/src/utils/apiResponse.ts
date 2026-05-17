export const apiResponse = <T>(
  success: boolean,
  message: string,
  data?: T
) => {
  return {
    success,
    message,
    data,
  };
};