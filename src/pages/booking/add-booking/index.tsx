/* eslint-disable no-console */
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
} from 'antd';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { MotelType } from '~/types/MotelType';
import { RoomType } from '~/types/RoomType';
import classNames from 'classnames/bind';
import styles from './addBooking.module.scss';
import { getAllMotel } from '~/api/motel.api';
import { getListRooms, getRooms } from '~/api/room.api';
import { DATE_FORMAT } from '~/consts/const';
import { generatePriceToVND } from '~/utils/helper';
import { IBooking } from '~/types/Booking.type';

const Option = Select;
const cx = classNames.bind(styles);
const CreateBooking = () => {
    const [form] = Form.useForm();
    const [listMotels, setListMotels] = useState<MotelType[]>([]);
    const [listRooms, setListRooms] = useState<RoomType[]>([]);

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

    const onSave = async (values: IBooking) => {
        // console.log(values);

        console.log({
            ...values,
            bookingDate: moment(values.bookingDate).format(DATE_FORMAT),
            dateOfArrival: values.dateOfArrival
                ? moment(values.dateOfArrival).format(DATE_FORMAT)
                : undefined,
        });
    };
    return (
        <div>
            <div className={cx('title-header')}>
                <PageHeader
                    ghost={true}
                    title='Thêm cọc giữ phòng'
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
                            onClick={form.submit}
                        >
                            Lưu
                        </Button>,
                    ]}
                />
            </div>

            <div>
                <Form
                    labelCol={{ span: 9 }}
                    autoComplete='off'
                    style={{ marginTop: 20, padding: 20 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    onFinish={onSave}
                >
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
                                initialValue={moment(new Date(), DATE_FORMAT)}
                            >
                                <DatePicker
                                    style={{ width: 350 }}
                                    format={DATE_FORMAT}
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
                                <Input style={{ width: 350 }} />
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
                                    format={DATE_FORMAT}
                                    style={{ width: 350 }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* Row5 */}
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

export default CreateBooking;
