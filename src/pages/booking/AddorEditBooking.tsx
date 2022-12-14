/* eslint-disable indent */
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    PageHeader,
    Row,
    Select,
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
import { convertDate, useGetParam } from '~/utils/helper';

import styles from './Booking.module.scss';

const cx = classNames.bind(styles);
const AddEditBooking = () => {
    const [form] = Form.useForm();
    const [listMotels, setListMotels] = useState<MotelType[]>([]);
    const [listRooms, setListRooms] = useState<RoomType[]>([]);
    const [param] = useGetParam('bookingId');

    useEffect(() => {
        const handleFetchData = async () => {
            const [{ data: motels }, { data: rooms }] = await Promise.all([
                getAllMotel(),
                getListRooms(),
            ]);
            setListMotels(motels);
            setListRooms(rooms);
        };
        handleFetchData();
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
                },
                isUpdate: true,
            };
            await updateRoomDeposit({ ...result, _id: param });
            notification({ message: MESSAGES.EDIT_SUCCESS });
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
            },
            isUpdate: false,
        };

        try {
            if (values.dateOfArrival < values.bookingDate) {
                Modal.error({
                    title: 'Th??ng b??o',
                    content: 'Ng??y nh???n ph??ng ph???i l???n h??n ng??y ?????t ph??ng',
                });
            } else if (values.bookingAmount <= 500000) {
                Modal.error({
                    title: 'Th??ng b??o',
                    content: 'S??? ti???n c???c t???i thi???u ph???i t??? 500.000?? tr??? l??n',
                });
            } else {
                await createRoomDeposit(result);
                notification({ message: MESSAGES.ADD_SUCCESS });
                goBack();
                return;
            }
        } catch (error: any) {
            // message.error(error.messages);
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
                    telephone: data.telephone,
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
                            title={`${param ? 'S???a' : 'Th??m'} c???c ph??ng`}
                            extra={[
                                <Button
                                    onClick={() => window.history.back()}
                                    key={1}
                                    icon={<RollbackOutlined />}
                                >
                                    Quay l???i
                                </Button>,
                                <Button
                                    type='primary'
                                    icon={<CheckOutlined />}
                                    key={2}
                                    htmlType='submit'
                                >
                                    L??u
                                </Button>,
                            ]}
                        />
                    </div>
                    {/* Row1 */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Nh??</>}
                                colon={false}
                                name='motelId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng ch???n nh?? tr???',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Select
                                    style={{ width: 350 }}
                                    placeholder='T???t c???'
                                    showSearch
                                    onChange={handleSelectRoom}
                                >
                                    {listMotels &&
                                        listMotels.map((item, index) => {
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
                        <Col span={8} offset={4}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Ph??ng</>}
                                colon={false}
                                name='motelRoomId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng ch???n ph??ng tr???',
                                    },
                                ]}
                                validateTrigger={['onBlur', 'onChange']}
                            >
                                <Select
                                    style={{ width: 350 }}
                                    placeholder='T???t c???'
                                    showSearch
                                >
                                    {listRooms &&
                                        listRooms.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item._id}
                                                >
                                                    {item.roomName}
                                                </Select.Option>
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
                                label={<>H??? t??n kh??ch</>}
                                colon={false}
                                name='fullName'
                            >
                                <Input style={{ width: 350 }} />
                            </Form.Item>
                        </Col>
                        <Col span={8} offset={4}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Ng??y ?????t</>}
                                colon={false}
                                name='bookingDate'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng ch???n ng??y ?????t',
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
                                label={<>S??? ??i???n tho???i</>}
                                colon={false}
                                name='telephone'
                            >
                                <Input style={{ width: 350 }} maxLength={10} />
                            </Form.Item>
                        </Col>
                        <Col span={8} offset={4}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Ti???n c???c</>}
                                colon={false}
                                name='bookingAmount'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng nh???p ti???n c???c',
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
                                    addonAfter={'VND'}
                                    style={{ width: 350 }}
                                    maxLength={10}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Row4 */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                labelAlign='left'
                                label={<>Ng??y d??? ki???n nh???n</>}
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
                                    label={<>???? ?????n</>}
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
                                    label={<>???? h???y</>}
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
                            label={<>Ghi ch??</>}
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
