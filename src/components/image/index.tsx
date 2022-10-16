import { Input } from 'antd';

type Props = {
    onChange: (event: any) => void;
    imgPreview: string;
    img?: string;
};

const Image = ({ imgPreview, onChange, img }: Props) => {
    return (
        <div>
            <Input
                accept='image/png, image/jpg, image/jpeg, image/gif'
                onChange={onChange}
                type='file'
                style={{ width: 400 }}
            />
        </div>
    );
};

export default Image;
