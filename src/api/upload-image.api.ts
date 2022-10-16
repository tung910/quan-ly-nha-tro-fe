import axios from 'axios';
import { API_UPLOAD } from './instance';

const uploadImg = (base64Image: string | ArrayBuffer | null) => {
    const url = '/upload';
    return axios.post(`${API_UPLOAD}/${url}`, { data: base64Image });
};
export default uploadImg;
