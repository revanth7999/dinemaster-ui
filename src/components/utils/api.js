import axios from "axios";

// General axios instance, you can customize it as needed
const axiosInstance = axios.create({
  baseURL: "https://example.com/api", // Use your API base URL
  headers: {
    "Content-Type": "application/json",
    // You can add other default headers here
  },
});

export const apiCall = async (
  url,
  method = "GET",
  data = null,
  params = {},
) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
      params, // Optional params if needed for GET requests
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error; // Optionally rethrow the error to be handled in the component
  }
};
