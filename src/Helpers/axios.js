import axios from "axios";

// const BASE_URL = "http://localhost:8003/api/v1"
const BASE_URL ="https://backend-e-commerce-5.onrender.com/api/v1"

const axiosInstance =axios.create(
    {
        baseURL:BASE_URL,
        withCredentials:true,
       
    }
)


export default axiosInstance