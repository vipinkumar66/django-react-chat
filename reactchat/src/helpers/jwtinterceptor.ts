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
            // If the response status is 403 (Forbidden)
            if (error.response?.status === 403) {
                const goRoot = () => navigate('/test'); // Create a function to navigate to '/test'
                goRoot(); // Navigate to the '/test' route
            }
        }
    );

    return jwtAxios; // Return the configured Axios instance
};

export default jwtinterceptor; // Export the jwtinterceptor function
