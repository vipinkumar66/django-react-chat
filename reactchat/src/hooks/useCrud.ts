import jwtinterceptor from "../helpers/jwtinterceptor"; // Import the jwtinterceptor function
import { BASE_URL } from "../config"; // Import the BASE_URL from the configuration
import React from "react"; // Import React

// Define the shape of the custom hook's return value
interface IuseCrud<T> {
  dataCRUD: T[]; // Array of data
  fetchData: () => Promise<void>; // Function to fetch data
  error: Error | null; // Error object or null
  isLoading: boolean; // Loading status
}

/**
 * Custom hook for handling CRUD operations with API integration and JWT authentication.
 * @param {Array} initialData - Initial data for the CRUD operations.
 * @param {string} apiURL - API endpoint URL for fetching data.
 * @returns {Object} An object containing functions and state for CRUD operations.
 */
const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
  const jwtAxios = jwtinterceptor(); // Get the configured Axios instance with JWT interceptor

  const [dataCRUD, setDataCRUD] = React.useState<T[]>(initialData); // State for CRUD data
  const [error, setError] = React.useState<Error | null>(null); // State for error
  const [isLoading, setIsLoading] = React.useState(false); // State for loading status

  /**
   * Fetch data from the API endpoint.
   * @returns {Promise} A Promise that resolves when data is fetched successfully.
   * @throws {Error} Throws an error if there's an issue with fetching data.
   */
  const fetchData = async (): Promise<any> => {
    setIsLoading(true); // Start loading

    try {
      // Fetch data using the configured Axios instance
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      const data = response.data;
      setDataCRUD(data); // Update the data state
      setIsLoading(false); // Stop loading
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400")); // Set error state for 400 status
      }
      setIsLoading(false); // Stop loading
      throw error;
    }
  };

  // Return an object with functions and states for CRUD operations
  return { fetchData, dataCRUD, error, isLoading };
};

export default useCrud; // Export the custom hook
