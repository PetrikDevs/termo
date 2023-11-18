import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosConfig;
