import React, { createContext, useContext } from 'react';
import { AuthServiceProps } from '../@types/auth-service';
import { useAuthService } from '../services/AuthService';

// Create a context to hold the authentication service
const AuthServiceContext = createContext<AuthServiceProps | null>(null);

/**
 * Provider component for the authentication service.
 * This component wraps your app's components to provide access to authentication services.
 *
 * @param {React.PropsWithChildren<{}>} props - Child components to be wrapped.
 */
export function AuthServiceProvider(props: React.PropsWithChildren<{}>) {
    // Get authentication services from useAuthService hook
    const authServices = useAuthService();

    return (
        // Provide the authentication services to the wrapped components
        <AuthServiceContext.Provider value={authServices}>
            {props.children}
        </AuthServiceContext.Provider>
    );
}

/**
 * Custom hook to access the authentication service context.
 * This hook can be used in components to access authentication-related functions and data.
 *
 * @returns {AuthServiceProps} - Authentication service functions and data.
 * @throws {Error} - Throws an error if used outside of the AuthServiceProvider.
 */
export function useAuthServiceContext(): AuthServiceProps {
    const context = useContext(AuthServiceContext);

    if (context === null) {
        throw new Error("Error - You have to use the AuthServiceProvider");
    }

    return context;
}

export default AuthServiceProvider;
