/* eslint-disable indent */
import { Button, Tabs, Form, PageHeader, message } from 'antd';
import moment from 'moment';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/FormCreate';
import { useState, useEffect } from 'react';
import styles from './Create.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import {
    addCustomerToRoom,
    editCustomerToRoom,
    getDetailCustomerToRoom,
} from '~/api/customer.api';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSAGES } from '~/consts/message.const';
import { IService } from '~/types/Service.type';
import { DATE_FORMAT } from '~/consts/const';
import { TypeCustomer } from '~/types/Customer';
const { TabPane } = Tabs;

const CustomerRedirect = () => {
    const { search } = useLocation();
    const roomName = new URLSearchParams(search).get('roomName') || '';
    const roomId = new URLSearchParams(search).get('roomId') || '';

    const [form]: any = Form.useForm();
    const roomRentID = new URLSearchParams(search).get('roomRentID') || '';
    const [newdataService, setNewdataService] = useState([]);
    const [newdataMember, setNewdataMember] = useState([]);
    const [newMotelRoomID, setNewMotelRoomID] = useState([]);
    useEffect(() => {
        if (roomRentID) {
            const dataRoom = async () => {
                const { data } = await getDetailCustomerToRoom(roomRentID);

                setNewMotelRoomID(data.motelRoomID);
                setNewdataService(data.service);
                setNewdataMember(data.member);
            };
            dataRoom();
        }
    }, []);

    const [service, setService] = useState<IService[]>([]);
    const onGetService = (data: IService[]) => {
        setService(data);
    };

    const navigate = useNavigate();

    const [member, setMember] = useState([]);

    const onGetMember = (dataSource: any) => {
        setMember(dataSource);
    };
    const onSave = async (values: TypeCustomer) => {
        if (roomRentID) {
            const data = {
                _id: roomRentID,
                CustomerInfo: {
                    ...values,
                    dateOfBirth: moment(values.dateOfBirth).format(DATE_FORMAT),
                    startDate: moment(values.startDate).format(DATE_FORMAT),
                    roomName,
                    motelRoomID: newMotelRoomID,
                },
                Service: service,
                Member: member,
            };

            await editCustomerToRoom(data);
            await message.success(MESSAGES.EDIT_SUCCESS);
            navigate('/motel-room');
        } else {
            const data = {
                CustomerInfo: {
                    ...values,
                    dateOfBirth: moment(values.dateOfBirth).format(DATE_FORMAT),
                    startDate: moment(values.startDate).format(DATE_FORMAT),
                    dateStart: moment(values.dateStart).format(DATE_FORMAT),
                    motelRoomID: roomId,
                    roomName,
                },
                Service: service,
                Member: member,
            };

            await addCustomerToRoom(data);
            await message.success(MESSAGES.ADD_SUCCESS);
            navigate('/motel-room');
        }
    };

    return (
        <div>
            <div>
                <PageHeader
                    ghost={true}
                    title={
                        window.location.pathname === '/customer/create'
                            ? 'Thêm thông tin khách thuê phòng'
                            : window.location.pathname === '/customer/view'
                            ? 'Xem thông tin khách thuê phòng'
                            : 'Sửa thông tin khách thuê phòng'
                    }
                    extra={[
                        <Button
                            key={1}
                            icon={<RollbackOutlined />}
                            className={cx('btn-back')}
                            onClick={() => window.history.back()}
                        >
                            Quay lại
                        </Button>,
                        <Button
                            key={2}
                            onClick={form.submit}
                            htmlType='submit'
                            type='primary'
                            className={cx('btn-submit')}
                            icon={<CheckOutlined />}
                            disabled={
                                window.location.pathname ===
                                    '/customer/create' ||
                                window.location.pathname === '/customer/edit'
                                    ? false
                                    : true
                            }
                        >
                            Lưu Thông Tin
                        </Button>,
                    ]}
                ></PageHeader>
            </div>
            <div>
                <Tabs>
                    <TabPane tab='Thông tin khách thuê' key='tab-a'>
                        <FormCreate
                            onSave={onSave}
                            roomRentID={roomRentID}
                            form={form}
                            roomName={roomName}
                        />
                    </TabPane>
                    <TabPane tab='Dịch vụ' key='tab-b'>
                        <ServiceCustomer
                            roomRentID={roomRentID}
                            newdataService={newdataService}
                            onGetService={onGetService}
                        />
                    </TabPane>
                    <TabPane tab='Thành viên' key='tab-c'>
                        <MemberCustomer
                            roomRentID={roomRentID}
                            newdataMember={newdataMember}
                            onGetMember={onGetMember}
                        />
                    </TabPane>
                    <TabPane tab='Hợp đồng' key='tab-d'>
                        <ContractCustomer
                            roomRentID={roomRentID}
                            form={form}
                            onSave={onSave}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default CustomerRedirect;
