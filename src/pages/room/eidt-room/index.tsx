import { Form, Input, Row, Col, Upload, Select } from 'antd';
import { RollbackOutlined, InboxOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
//
import { MotelType } from '~/types/MotelType';
import styles from './EditRoom.module.scss';
import HeaderPage from '~/components/page-header';
import { getAllMotel } from '~/api/motel.api';
import { editRoom, getRoom } from '~/api/room.api';
import { RoomType } from '~/types/RoomType';
const { Option } = Select;
const { Dragger } = Upload;
const cx = classNames.bind(styles);
const { TextArea } = Input;

const EditRoom = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const id = (useParams().id as string) || '';
    const [motels, setMotels] = useState<MotelType[]>();
    const [fileList, setFileList] = useState<any>([]);

    useEffect(() => {
        const getMotels = async () => {
            const { data } = await getAllMotel();

            setMotels(data);
        };
        getMotels();
        const readRoom = async () => {
            const { data } = await getRoom(id);

            form.setFieldsValue(data);
        };
        readRoom();
    }, []);

    const onFinish = async (values: RoomType) => {
        values._id = id;
        const edit = async () => {
            await editRoom(values);
            alert('Bạn thêm thành công!');
            navigate('/motel-room');
        };
        edit();
    };

    const handleBeforeUpload = (file: any) => {
        setFileList([...fileList, file]);
        return false;
    };

    const handleChangeFiles = ({ fileList, file }: any) => {
        setFileList([...fileList]);
    };

    const handleRemove = (selectedFile: any) => {
        return fileList.filter((file: any) => {
            return selectedFile.uid !== file.uid;
        });
    };
    return (
        <div>
            <Content>
                <div></div>
                <div className={cx('form-edit')}>
                    <Form
                        autoComplete='off'
                        layout='vertical'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 20 }}
                        form={form}
                        onFinish={onFinish}
                    >
                        <HeaderPage
                            title={'Cập nhật phòng trọ'}
                            btn1=' Quay lại'
                            btn2='Cập nhật'
                            iconButton={<RollbackOutlined />}
                            href='/motel-room'
                        ></HeaderPage>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name='roomName'
                                    label='Phòng số'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                        {
                                            type: 'string',
                                            min: 3,
                                            message: 'Phải lớn hơn 3 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='motelID'
                                    label='Nhà'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                    ]}
                                >
                                    <Select defaultValue='Mời chọn nhà'>
                                        {motels &&
                                            motels.map((item, index) => {
                                                return (
                                                    <Option
                                                        key={index}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='maxPerson'
                                    label='Số lượng người tối đa'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' addonAfter='Người' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='unitPrice'
                                    label='Đơn giá'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' addonAfter='VND' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='height'
                                    label='Dài'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' addonAfter='m' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='width'
                                    label='Rộng'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' addonAfter='m' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='description'
                                    label='Mô tả thêm'
                                >
                                    <TextArea rows={7} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='Hình ảnh'>
                                    <Dragger
                                        {...{
                                            fileList,
                                            defaultFileList: fileList,
                                            onRemove: handleRemove,
                                            beforeUpload: handleBeforeUpload,
                                            multiple: true,
                                            onChange: handleChangeFiles,
                                            listType: 'picture',
                                        }}
                                    >
                                        <p className='ant-upload-drag-icon'>
                                            <InboxOutlined />
                                        </p>
                                        <p className='ant-upload-text'>
                                            Click or drag file to this area to
                                            upload
                                        </p>
                                        <p className='ant-upload-hint'>
                                            Support for a single or bulk upload.
                                            Strictly prohibit from uploading
                                            company data or other band files
                                        </p>
                                    </Dragger>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
        </div>
    );
};

export default EditRoom;
