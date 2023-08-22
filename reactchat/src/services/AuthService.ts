import { AuthServiceProps } from "../@types/auth-service";
import axios from "axios";

/**
 * Custom hook to provide authentication-related services.
 *
 * @returns {AuthServiceProps} - Authentication service functions.
 */
export function useAuthService(): AuthServiceProps {

    const getUserDetails = async () =>{
        try{
            const userid = localStorage.getItem("userId");
            const accessToken = localStorage.getItem("access_token");

            const response = await axios.get(`http://127.0.0.1:8000/api/account/?user_id=${userid}`, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const userdetails = response.data;

            localStorage.setItem("username", userdetails.username)
        }catch (error){
            console.log(error,"error")
        }
    }

    const getUserIdFromToken = (access: string) =>{
        const token = access;
        const tokenParts = token.split(".");
        const decodedPayLoad = tokenParts[1];
        const encodedPayLoad = atob(decodedPayLoad);
        const payLoadData = JSON.parse(encodedPayLoad);
        const userId = payLoadData.user_id;

        return userId
    }

    /**
     * Function for user login.
     *
     * @param {string} username - The user's username.
     * @param {string} password - The user's password.
     * @returns {Promise<any>} - A promise representing the login status or an error.
     */
    const login = async (username: string, password: string): Promise<any> => {

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username,
                    password
                }
            );
            const {access, refresh} = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);
            localStorage.setItem("userId", getUserIdFromToken(access));

            getUserDetails()

        } catch (err: any) {
            // Return the error object for handling
            return err;
        }
    };

    return { login };
}
