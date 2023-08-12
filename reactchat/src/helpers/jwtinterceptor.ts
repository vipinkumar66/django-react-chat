import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
import axios, { AxiosInstance} from 'axios'
const API_URL = BASE_URL


const jwtinterceptor = ():AxiosInstance => {

    const jwtAxios = axios.create({baseURL:API_URL})
    const navigate = useNavigate()

    jwtAxios.interceptors.response.use(
        (response)=>{
            return response
        },
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 403){
            const goRoot = () => navigate('/test')
            goRoot()
        }
    }
    )
    return jwtAxios;
}


export default jwtinterceptor
