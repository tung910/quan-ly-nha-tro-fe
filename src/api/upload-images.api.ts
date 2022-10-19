import axios from 'axios';

const uploadImg = async (base64Image: string | ArrayBuffer | null) => {
    const res = await axios.post(
        `${import.meta.env.VITE_UPLOAD_IMG}/upload-img`,
        {
            data: base64Image,
        }
    );
    const data = await res.data;
    const img = await data.secure_url;
    return img;
};
export default uploadImg;
