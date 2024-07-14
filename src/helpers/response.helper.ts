

export const handleSuccess = (message: any) => {
  return {
    success: true,
    message: message,
  };
};
  
export const handleError = (error: any) => {
  return {
    success: false,
    error: error.message,
  };
};