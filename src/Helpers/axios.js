import axios from "axios";

// const BASE_URL = "http://localhost:8003/api/v1"
const BASE_URL ="https://backend-e-commerce-5.onrender.com"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL= BASE_URL;
axiosInstance.defaults.withCredentials=true


export default axiosInstance