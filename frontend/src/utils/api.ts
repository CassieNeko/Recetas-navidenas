import axios from "axios";
//Se usa para variable de entorno con Vite
const apiUrl = import.meta.env.VITE_REACT_APP_API_URI || 'http://localhost:5000';
const apiClient = axios.create({
    baseURL: apiUrl
})
export default apiClient;