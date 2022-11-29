/* eslint-disable indent */
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    PageHeader,
    Row,
    Select,
    message,
} from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
    createRoomDeposit,
    getRoomDeposit,
    updateRoomDeposit,
} from '~/api/booking.api';
import { getAllMotel } from '~/api/motel.api';
import { getListRooms, getRooms } from '~/api/room.api';
import notification from '~/components/notification';
import { DateFormat } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { IBooking } from '~/types/Booking.type';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import { convertDate, generatePriceToVND, useGetParam } from '~/utils/helper';

import styles from './Booking.module.scss';

const Option = Select;
const cx = classNames.bind(styles);
const AddEditBooking = () => {
    const [form] = Form.useForm();
    const [listMotels, setListMotels] = useState<MotelType[]>([]);
    const [listRooms, setListRooms] = useState<RoomType[]>([]);
    const [param] = useGetParam('bookingId');

    useEffect(() => {
        const getListMotels = async () => {
            const { data } = await getAllMotel();
            setListMotels(data);
        };
        getListMotels();

        const getListRoom = async () => {
            const { data } = await getListRooms();
            setListRooms(data);
        };
        getListRoom();
    }, []);

    const handleSelectRoom = async (id: any) => {
        const { data } = await getRooms(id);
        setListRooms(data);
    };

    const goBack = () => {
        window.history.back();
    };

    const onSave = async (values: IBooking) => {
        if (param) {
            const result = {
                data: {
                    ...values,
                    bookingDate: convertDate(
                        values.bookingDate,
                        DateFormat.DATE_M_D_Y
                    ),
                    dateOfArrival: values.dateOfArrival
                        ? convertDate(
                              values.dateOfArrival,
                              DateFormat.DATE_M_D_Y
                          )
                        : undefined,
                    telephone: +values.telephone,
                },
                isUpdate: true,
            };
            await updateRoomDeposit({ ...result, _id: param });
            message.success(MESSAGES.EDIT_SUCCESS);
            goBack();
            return;
        }

        const result = {
            data: {
                ...values,
                bookingDate: convertDate(
                    values.bookingDate,
                    DateFormat.DATE_M_D_Y
                ),
                dateOfArrival: values.dateOfArrival
                    ? convertDate(values.dateOfArrival, DateFormat.DATE_M_D_Y)
                    : undefined,
                telephone: +values.telephone,
            },
            isUpdate: false,
        };

        try {
            await createRoomDeposit(result);
            notification({ message: MESSAGES.ADD_SUCCESS });
            goBack();
            return;
        } catch (error: any) {
            message.error(error.messages);
        }
    };

    useEffect(() => {
        if (param) {
            const fetchData = async () => {
                const { data } = await getRoomDeposit(param);

                const resposive = await getRooms(data.motelId);
                setListRooms(resposive.data);

                form.setFieldsValue({
                    bookingDate: moment(data.bookingDate),
                    bookingAmount: data.bookingAmount,
                    motelId: data.motelId,
                    motelRoomId: data.motelRoomId,
                    telephone: +data.telephone,
                    fullName: data.fullName,
                    dateOfArrival: moment(data.dateOfArrival),
                    hasCancel: data.hasCancel,
                    hasCheckIn: data.hasCheckIn,
                    cancelDate: data.cancelDate,
                    checkInDate: data.checkInDate,
                    note: data.note,
                });
            };
            fetchData();
        }
    }, [param]);

    return (
        <div>
            <div>
                <Form
                    labelCol={{ span: 9 }}
                    autoComplete='off'
                    style={{ padding: 20 }}
                    wrapperCol={{ span: 16 }}
                    form={param ? form : undefined}
                    onFinish={onSave}
                >
                    <div
                        className={cx('title-header')}
                        style={{ marginBottom: 30 }}
                    >
                        <PageHeader
                            ghost={true}
                            title={`${param ? 'Sửa' : 'Thêm'} cọc phòng`}
                            extra={[
                                <Button
                                    onClick={() => window.history.back()}
                                    key={1}
                                    icon={<RollbackOutlined />}
                                >
                                    Quay lại
                                </Button>,
                                <Button
                                    type='primary'
                                    icon={<CheckOutlined />}
                                    key={2}
                                    htmlType='submit'
                                >
                                    Lưu
                                </Button>,
                            ]}
                        />
                    </div>
                    {/* Row1 */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Nhà</>}
                                colon={false}
                                name='motelId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn nhà trọ',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Select
                                    style={{ width: 350 }}
                                    defaultValue='Tất cả'
                                    showSearch
                                    onChange={handleSelectRoom}
                                >
                                    {listMotels &&
                                        listMotels.map((item, index) => {
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
                        <Col span={8} offset={4}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Phòng</>}
                                colon={false}
                                name='motelRoomId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn phòng trọ',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Select
                                    style={{ width: 350 }}
                                    defaultValue='Tất cả'
                                    showSearch
                                >
                                    {listRooms &&
                                        listRooms.map((item, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.roomName}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Row2 */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Họ tên khách</>}
                                colon={false}
                                name='fullName'
                            >
                                <Input style={{ width: 350 }} />
                            </Form.Item>
                        </Col>
                        <Col span={8} offset={4}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Ngày đặt</>}
                                colon={false}
                                name='bookingDate'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày đặt',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                                initialValue={moment(new Date())}
                            >
                                <DatePicker
                                    style={{ width: 350 }}
                                    format={DateFormat.DATE_DEFAULT}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Row3 */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Số điện thoại</>}
                                colon={false}
                                name='telephone'
                            >
                                <Input style={{ width: 350 }} maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col span={8} offset={4}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Tiền cọc</>}
                                colon={false}
                                initialValue={generatePriceToVND(0)}
                                name='bookingAmount'
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
                                    addonAfter={'VND'}
                                    style={{ width: 350 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Row4 */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Ngày dự kiến nhận</>}
                                colon={false}
                                name='dateOfArrival'
                            >
                                <DatePicker
                                    format={DateFormat.DATE_DEFAULT}
                                    style={{ width: 350 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Row5 */}
                    {param ? (
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    labelAlign='left'
                                    label={<>Đã đến</>}
                                    colon={false}
                                    name='bookingDate'
                                >
                                    <DatePicker
                                        format={DateFormat.DATE_DEFAULT}
                                        style={{ width: 350 }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8} offset={4}>
                                <Form.Item
                                    labelAlign='left'
                                    label={<>Đã hủy</>}
                                    colon={false}
                                    name='bookingDate'
                                >
                                    <DatePicker
                                        format={DateFormat.DATE_DEFAULT}
                                        style={{ width: 350 }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : (
                        ''
                    )}
                    <Col span={8}>
                        <Form.Item
                            labelAlign='left'
                            label={<>Ghi chú</>}
                            colon={false}
                            name='note'
                        >
                            <Input.TextArea
                                style={{
                                    width: 950,
                                    height: 115,
                                    maxWidth: 950,
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Form>
            </div>
        </div>
    );
};

export default AddEditBooking;
