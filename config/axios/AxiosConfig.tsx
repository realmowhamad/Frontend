import axios from "axios";
import { getCookie } from "cookies-next";

// Constants for token and refresh token cookie names
const TOKEN = "access";
const REFRESH_TOKEN = "refresh";

// Determine the base URL based on the environment (production or development)
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PRODUCTION
    : process.env.NEXT_PUBLIC_API_BASE_URL;


// Create an Axios instance with default configuration
const AxiosConfigInstansce = axios.create({
  baseURL: BASE_URL, // Set the base URL
  withCredentials: true, // Send cookies with requests
  headers: {
    accept: "application/json", // Set default accept header
  },
});


// Add a request interceptor to handle authentication tokens
AxiosConfigInstansce.interceptors.request.use(
  (request) => {
    // Retrieve token and refreshToken from cookies
    const token = getCookie(TOKEN);
    const refreshToken = getCookie(REFRESH_TOKEN);

    // Add Authorization header if token exists
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    // Add custom "refresh-token" header if refreshToken exists
    if (refreshToken) {
      request.headers["refresh"] = refreshToken;
    }

    // Return the modified request
    return request;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses and errors
AxiosConfigInstansce.interceptors.response.use(
  (response) => {
    // Return the response data if the request is successful
    return response;
  },
  async (error) => {
    // Handle 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      // Uncomment the following lines to handle the error, such as redirecting or removing user data

      localStorage.removeItem("user");

    }
    // Handle 403 Forbidden error
    if (error.response && error.response.status === 403) {
      // Uncomment the following line to remove user data
      // localStorage.removeItem("user");
    }

    // Return the error to the calling code
    return Promise.reject(error);
  }
);

// Export the Axios instance for use in other parts of the application
export default AxiosConfigInstansce;
