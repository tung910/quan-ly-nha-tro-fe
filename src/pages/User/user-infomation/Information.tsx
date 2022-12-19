import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Modal,
    Row,
    Space,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useState } from 'react';
import { updateProfile } from '~/api/auth.api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import notification from '~/components/notification';
import { MESSAGES } from '~/constants/message.const';

const getImgBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const Information = ({ form, imageUrl }: any) => {
    const user = useAppSelector((state: any) => state.user.user);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>(user?.images || []);
    const dispath = useAppDispatch();
    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const handleCancel = () => setPreviewOpen(false);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const onPreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getImgBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
        );
    };
    const handleSubmit = async (e: any) => {
        const data = {
            ...e,
            avatar: imageUrl,
            images: fileList,
        };
        const { data: dataUpdate } = await updateProfile(user._id, { data });
        notification({ message: MESSAGES.EDIT_SUCCESS });
    };
    return (
        <Form
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 24 }}
            style={{ marginTop: 10, padding: 10 }}
            autoComplete='off'
            form={form}
            onFinish={handleSubmit}
        >
            <Form.Item
                label={<>Họ và tên</>}
                colon={true}
                labelAlign='left'
                name='name'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ và tên người dùng!',
                    },
                ]}
                validateTrigger={['onChange']}
            >
                <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
                label={<>Email</>}
                colon={true}
                labelAlign='left'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập email người dùng!',
                    },
                ]}
                validateTrigger={['onChange']}
            >
                <Input type='email' style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
                label={<>Số điện thoại</>}
                colon={true}
                labelAlign='left'
                name='phone'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại người dùng!',
                    },
                ]}
                validateTrigger={['onChange']}
            >
                <Input style={{ width: 400 }} maxLength={10} />
            </Form.Item>
            <Form.Item
                label={<>Số CMND</>}
                colon={true}
                labelAlign='left'
                name='citizenIdentificationNumber'
                rules={[
                    {
                        required: true,
                        message:
                            'Vui lòng nhập chứng minh nhân dân người dùng!',
                    },
                ]}
                validateTrigger={['onChange']}
            >
                <Input style={{ width: 400 }} maxLength={12} />
            </Form.Item>

            <Form.Item
                label={<>Địa chỉ</>}
                colon={true}
                labelAlign='left'
                name='address'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ người dùng!',
                    },
                ]}
                validateTrigger={['onBlur', 'onChange']}
            >
                <Input style={{ width: 400 }} />
            </Form.Item>
            <Row>
                <Space direction='vertical'>
                    <>Căn cước công dân (Mặt trước, Mặt sau)</>
                    <Upload
                        action={`${import.meta.env.VITE_BASE_URL}/upload-img`}
                        listType='picture-card'
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList?.length > 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Space>
            </Row>
            <Button type='primary' htmlType='submit'>
                Lưu thông tin
            </Button>
        </Form>
    );
};

export default Information;
