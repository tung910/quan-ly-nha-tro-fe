import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card,
    Col,
    Form,
    Image,
    Row,
    Upload,
    UploadFile,
    UploadProps,
    message,
} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { useAppSelector } from '~/app/hooks';
import Tabs from '~/components/tabs';
import { BASE_IMG } from '~/constants/const';
import { TypeTabs } from '~/types/Setting.type';

import ChangePassword from './ChangePassword';
import Information from './Information';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Bạn phải chọn file ảnh có định dạng JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Ảnh có dung lượng quá lớn 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Profile = () => {
    const user = useAppSelector((state: any) => state.user.user);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(user?.avatar || BASE_IMG);
    const [form] = Form.useForm();
    const [tab, setTab] = useState('info');
    useEffect(() => {
        form.setFieldsValue({
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            citizenIdentificationNumber: user.citizenIdentificationNumber,
            address: user.address,
        });
    }, [form]);

    const handleChange: UploadProps['onChange'] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const items: TypeTabs[] = [
        {
            label: 'Thay đổi thông tin cá nhân',
            key: 'info',
            children: (
                <>
                    <Information form={form} imageUrl={imageUrl} />
                </>
            ),
        },
        {
            label: 'Thay đổi mật khẩu ',
            key: 'password',
            children: <ChangePassword />,
        },
    ];
    return (
        <div>
            <Row
                gutter={[16, 16]}
                style={{
                    marginTop: 20,
                    padding: 20,
                    border: '1px solid rgb(205, 205, 205)',
                }}
            >
                <Col span={8}>
                    <Card
                        title={
                            <span style={{ fontSize: 18 }}>Ảnh đại diện</span>
                        }
                        bordered={true}
                        style={{ textAlign: 'center' }}
                    >
                        <Upload
                            name='avatar'
                            listType='picture'
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            action={`${
                                import.meta.env.VITE_BASE_URL
                            }/upload-img`}
                        >
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={user?.name}
                                    preview={false}
                                    loading='lazy'
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        <p
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 30,
                                marginBottom: 110,
                            }}
                        >
                            {user?.name}
                        </p>
                    </Card>
                </Col>

                <Col span={16}>
                    {' '}
                    <Card>
                        <Tabs
                            activeKey={tab}
                            onChange={setTab}
                            items={items}
                        ></Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
