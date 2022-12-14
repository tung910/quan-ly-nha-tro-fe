import { InboxOutlined, RollbackOutlined } from '@ant-design/icons';
import {
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Upload,
    message,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllMotel } from '~/api/motel.api';
import { editRoom, getRoom } from '~/api/room.api';
import { useAppDispatch } from '~/app/hooks';
import notification from '~/components/notification';
import HeaderPage from '~/components/page-header';
import { MESSAGES } from '~/constants/message.const';
import { setIsLoading } from '~/feature/service/appSlice';
//
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';

import styles from './EditRoom.module.scss';

const { Option } = Select;
const { Dragger } = Upload;
const cx = classNames.bind(styles);
const { TextArea } = Input;

const EditRoom = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const id = (useParams().id as string) || '';
    const [motels, setMotels] = useState<MotelType[]>();
    const [fileList, setFileList] = useState<any>([]);

    useEffect(() => {
        const handleFetchData = async () => {
            dispatch(setIsLoading(true));
            try {
                const res = await Promise.all([getAllMotel(), getRoom(id)]);
                const [{ data: motels }, { data: room }] = res;
                setMotels(motels);
                setFileList(room.images);
                form.setFieldsValue(room);
            } catch (error) {
                //
            }
            dispatch(setIsLoading(false));
        };
        handleFetchData();
    }, []);

    const onFinish = async (values: RoomType) => {
        dispatch(setIsLoading(true));
        try {
            await editRoom({ ...values, images: fileList, _id: id });
            notification({ message: MESSAGES.EDIT_SUCCESS });
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
                            title={'C???p nh???t ph??ng tr???'}
                            btn1=' Quay l???i'
                            btn2='C???p nh???t'
                            iconButton={<RollbackOutlined />}
                            href='/motel-room'
                        ></HeaderPage>
                        <Row gutter={[8, 8]}>
                            <Col span={12}>
                                <Form.Item
                                    name='roomName'
                                    label='Ph??ng s???'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
                                        },
                                        {
                                            type: 'string',
                                            min: 3,
                                            message: 'Ph???i l???n h??n 3 k?? t???!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='motelID'
                                    label='Nh??'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
                                        },
                                    ]}
                                >
                                    <Select placeholder='M???i ch???n nh??'>
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
                                    label='S??? l?????ng ng?????i t???i ??a'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
                                        },
                                    ]}
                                >
                                    <Input placeholder='' addonAfter='Ng?????i' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='unitPrice'
                                    label='????n gi??'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
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
                                        parser={(value: any) =>
                                            value.replace(/\$\s?|(,*)/g, '')
                                        }
                                        addonAfter='VND'
                                        min={0}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name='area'
                                    label='Di???n T??ch'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kh??ng ???????c ????? tr???ng',
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
                                    label='M?? t??? th??m'
                                >
                                    <TextArea rows={7} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='H??nh ???nh'>
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

export default EditRoom;
