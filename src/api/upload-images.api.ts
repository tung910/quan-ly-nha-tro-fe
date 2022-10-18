import axios from 'axios';

const uploadImg = (base64Image: string | ArrayBuffer | null) => {
    return axios.post(`${import.meta.env.VITE_UPLOAD_IMG}/upload-img`, {
        data: base64Image,
    });
};
export default uploadImg;
