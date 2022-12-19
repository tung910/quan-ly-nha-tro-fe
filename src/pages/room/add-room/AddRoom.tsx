import { InboxOutlined, RollbackOutlined } from '@ant-design/icons';
import { Col, Form, Input, InputNumber, Row, Select, Upload } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMotel } from '~/api/motel.api';
import { addRoom } from '~/api/room.api';
import { useAppDispatch } from '~/app/hooks';
import notification from '~/components/notification';
import HeaderPage from '~/components/page-header';
import { MESSAGES } from '~/constants/message.const';
import { setIsLoading } from '~/feature/service/appSlice';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { useGetParam } from '~/utils/helper';

import styles from './AddRoom.module.scss';

const { Dragger } = Upload;
const cx = classNames.bind(styles);
const { TextArea } = Input;

const AddRoom = () => {
    const [motelId] = useGetParam('motelId');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [motels, setMotels] = useState<MotelType[]>();
    const [fileList, setFileList] = useState<any>([]);
    useEffect(() => {
        const getMotels = async () => {
            const { data } = await getAllMotel();
            const motel = data.find(
                (item: any) => item._id === motelId && item
            );
            form.setFieldValue('motelID', motel._id);
            setMotels(data);
        };
        getMotels();
    }, []);

    const onFinish = async (values: RoomType) => {
        dispatch(setIsLoading(true));
        try {
            await addRoom({ ...values, images: fileList });
            notification({ message: MESSAGES.ADD_SUCCESS });
            navigate('/motel-room');
        } catch (error) {
            //
        }
        dispatch(setIsLoading(false));
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
                            title={'Thêm mới phòng trọ'}
                            btn1=' Quay lại'
                            btn2=' Thêm mới'
                            iconButton={<RollbackOutlined />}
                            href='/motel-room'
                        ></HeaderPage>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name='roomName'
                                    label='Tên phòng'
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
                                    <Select placeholder='Mời chọn nhà'>
                                        {motels &&
                                            motels.map((item, index) => {
                                                return (
                                                    <Select.Option
                                                        key={index}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </Select.Option>
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
                                    initialValue={3}
                                >
                                    <InputNumber
                                        placeholder=''
                                        addonAfter='Người'
                                        max={5}
                                        min={0}
                                        width='100%'
                                        maxLength={1}
                                    />
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
                                    <InputNumber
                                        formatter={(value) =>
                                            ` ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )
                                        }
                                        parser={(value) =>
                                            ` ${value}`.replace(
                                                /\$\s?|(,*)/g,
                                                ''
                                            )
                                        }
                                        addonAfter='VND'
                                        maxLength={11}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='area'
                                    label='Diện tích'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Không được để trống',
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        placeholder=''
                                        addonAfter={
                                            <>
                                                m<sup>2</sup>
                                            </>
                                        }
                                        min={0}
                                        maxLength={2}
                                    />
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

export default AddRoom;
