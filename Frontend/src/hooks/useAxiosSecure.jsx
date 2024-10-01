import { useContext, useEffect } from "react";
import { AuthContext } from "../utilities/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Create an axios instance with base URL
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
  });

  useEffect(() => {
    // Add request interceptor to include token in the Authorization header
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors like 401 and 403
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response, 
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          await logout(); // Call logout to remove user session
          navigate('/login', { replace: true }); // Redirect to login page
        }
        return Promise.reject(error); // Forward the error for further handling
      }
    );

    // Cleanup function to remove interceptors
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
