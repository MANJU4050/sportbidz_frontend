import axios from "axios";

const baseURL = import.meta.env.VITE_MODE === 'development' ? import.meta.env.VITE_BACKEND_URL : null

const api = axios.create({
    baseURL: `${baseURL}${import.meta.env.VITE_API_VERSION}`,
    timeout: 1000,
})

export default api