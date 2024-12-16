import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5000';


const apiClient = axios.create({
    baseURL: apiUrl, 
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json', 
    },
});


apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        console.error('API request failed:', error.response || error.message);
        return Promise.reject(error); 
    }
);

export default apiClient;
