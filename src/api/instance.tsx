import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
instance.interceptors.request.use(
    (config) => config,
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);
export default instance;
