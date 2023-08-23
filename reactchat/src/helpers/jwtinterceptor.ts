// Import necessary modules and components
import { useNavigate } from 'react-router-dom'; // Import navigation function from React Router
import { BASE_URL } from '../config'; // Import the base URL from a configuration file
import axios, { AxiosInstance } from 'axios'; // Import axios for making HTTP requests

// Define the API URL using the imported BASE_URL
const API_URL = BASE_URL;

// Create a function to set up an Axios instance with JWT interceptor
const jwtinterceptor = (): AxiosInstance => {
    // Create an Axios instance with the API_URL as the base URL
    const jwtAxios = axios.create({ baseURL: API_URL });

    // Get the navigation function for routing
    const navigate = useNavigate();

    // Add an interceptor to the Axios instance for handling responses
    jwtAxios.interceptors.response.use(
        (response) => {
            return response; // Return the response as-is
        },
        async (error) => {
            const originalRequest = error.config
            // If the response status is 403 (Forbidden)
            if (error.response?.status === 403 || 401) {
                const refreshToken = localStorage.getItem("refresh_token");
                if (refreshToken){
                    try{
                        const getNewToken = await axios.post(`${BASE_URL}/token/refresh/`,{
                            refresh:refreshToken
                        })
                        const accessToken = getNewToken.data?.access
                        localStorage.setItem("access_token", accessToken)
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
                        return jwtAxios(originalRequest)
                    }catch(accessError){
                        navigate('/login')
                        throw accessError
                    }
                }else{
                    navigate('/login')
                }
            }
        }
    );

    return jwtAxios; // Return the configured Axios instance
};

export default jwtinterceptor; // Export the jwtinterceptor function
