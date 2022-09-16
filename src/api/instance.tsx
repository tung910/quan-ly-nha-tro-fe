import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
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
