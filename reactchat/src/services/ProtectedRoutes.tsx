import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";


const ProtectedRoutes = ({children}:{children: React.ReactNode}) =>{
    const {isLoggedIn} = useAuthServiceContext();
    if (!isLoggedIn){
        return <Navigate to="/login" replace={true}/>
    }
    return <>{children}</>
};

export default ProtectedRoutes;