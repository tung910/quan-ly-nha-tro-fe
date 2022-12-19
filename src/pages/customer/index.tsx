/* eslint-disable indent */
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Form, PageHeader } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProvinces } from '~/api/addressCheckout';
import { updateStatusRoomDeposit } from '~/api/booking.api';
import {
    addCustomerToRoom,
    editCustomerToRoom,
    getDetailCustomerToRoom,
    sendEmailAccount,
} from '~/api/customer.api';
import { getAllService } from '~/api/service.api';
import { useAppDispatch } from '~/app/hooks';
import notification from '~/components/notification';
import Tabs from '~/components/tabs';
import { DateFormat } from '~/constants/const';
import { MESSAGES } from '~/constants/message.const';
import { setIsLoading } from '~/feature/service/appSlice';
import ContractCustomer from '~/modules/contract-customer/ContractCustomer';
import MemberCustomer from '~/modules/member-customer/MemberCustomer';
import ServiceCustomer from '~/modules/service-customer/ServiceCustomer';
import FormCreate from '~/modules/tenant-infor/FormCreate';
import { TypeCustomer } from '~/types/Customer';
import { IService } from '~/types/Service.type';
import { TypeTabs } from '~/types/Setting.type';
import { convertDate, useGetParam } from '~/utils/helper';

import styles from './Create.module.scss';

const cx = classNames.bind(styles);

const CustomerRedirect = () => {
    const [tab, setTab] = useState('info');
    const [images, setImages] = useState<string | ArrayBuffer | any>([]);
    const [imageUrl, setImageUrl] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [newdataService, setNewdataService] = useState([]);
    const [newdataMember, setNewdataMember] = useState([]);
    const [newMotelRoomID, setNewMotelRoomID] = useState([]);
    const [service, setService] = useState<IService[]>([]);
    const [services, setServices] = useState<IService[]>([]);
    const [member, setMember] = useState([]);
    const { search } = useLocation();
    const dispatch = useAppDispatch();
    const roomName = new URLSearchParams(search).get('roomName') || '';
    const roomId = new URLSearchParams(search).get('roomId') || '';
    const motelID = new URLSearchParams(search).get('motelId') || '';
    const [form]: any = Form.useForm();
    const roomRentID = new URLSearchParams(search).get('roomRentID') || '';
    const [bookingId] = useGetParam('booking');
    const navigate = useNavigate();

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
        Promise.all([getProvinces(), getAllService()])
            .then(([{ data: dataProvider }, { data: services }]) => {
                setProvinces(dataProvider);
                const serviceList = services.map((item: IService) => ({
                    ...item,
                    quantity: '1',
                }));
                setServices(serviceList);
            })
            .catch((err) => {
                throw Error(err);
            });
    }, []);

    const onGetService = (data: IService[]) => {
        setService(data);
    };

    const onGetMember = (dataSource: any) => {
        setMember(dataSource);
    };
    const onSave = async (values: TypeCustomer) => {
        dispatch(setIsLoading(true));
        try {
            if (roomRentID) {
                const data = {
                    _id: roomRentID,
                    CustomerInfo: {
                        ...values,
                        dateOfBirth: values.dateOfBirth
                            ? moment(values.dateOfBirth).format(
                                  DateFormat.DATE_DEFAULT
                              )
                            : undefined,
                        startDate: moment(values.startDate).format(
                            DateFormat.DATE_DEFAULT
                        ),
                        dateRange: values.dateRange
                            ? convertDate(values.dateRange)
                            : undefined,
                        roomName,
                        motelRoomID: newMotelRoomID,
                        motelID,
                    },
                    Service: service.length <= 0 ? services : service,
                    Member: member,
                };
                await editCustomerToRoom(data);
                dispatch(setIsLoading(false));
                notification({ message: MESSAGES.EDIT_SUCCESS });
                navigate('/motel-room');
            } else {
                const data = {
                    CustomerInfo: {
                        ...values,
                        dateOfBirth: values.dateOfBirth
                            ? moment(values.dateOfBirth).format(
                                  DateFormat.DATE_DEFAULT
                              )
                            : undefined,
                        startDate: values.startDate
                            ? moment(values.startDate).format(
                                  DateFormat.DATE_DEFAULT
                              )
                            : moment(Date.now()).format(
                                  DateFormat.DATE_DEFAULT
                              ),
                        dateRange: values.dateRange
                            ? convertDate(values.dateRange)
                            : undefined,
                        motelRoomID: roomId,
                        motelID,
                        roomName,
                        image: imageUrl,
                    },
                    Service: service.length <= 0 ? services : service,
                    Member: member,
                    Contract: {
                        coinNumber: values?.coinNumber,
                        startDate: values?.startDate
                            ? moment(values.startDate).format(
                                  DateFormat.DATE_DEFAULT
                              )
                            : moment(Date.now()).format(
                                  DateFormat.DATE_DEFAULT
                              ),
                        timeCoin: values?.timeCoin,
                    },
                };
                const sendEmail = {
                    email: [data?.CustomerInfo.email],
                };
                await addCustomerToRoom(data);
                await sendEmailAccount(sendEmail);
                dispatch(setIsLoading(false));
                notification({ message: MESSAGES.ADD_SUCCESS });
                navigate('/motel-room');
            }
        } catch (error) {
            dispatch(setIsLoading(false));
        }
    };

    const handleSubmit = async () => {
        form.validateFields()
            .then(() => {
                form.submit();
                if (bookingId) {
                    const value = {
                        data: {
                            checkInDate: Date(),
                            hasCheckIn: true,
                        },
                    };
                    updateStatusRoomDeposit(bookingId, value);
                }
            })
            .catch(() => {
                // console.log('errorfields', errorfields);
            });
    };
    const items: TypeTabs[] = [
        {
            label: 'Thông tin khách thuê',
            key: 'info',
            children: (
                <FormCreate
                    provinces={provinces}
                    onSave={onSave}
                    roomRentID={roomRentID}
                    form={form}
                    roomName={roomName}
                    roomId={roomId}
                    setImg={setImages}
                    images={images}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                />
            ),
        },
        {
            label: 'Dịch vụ',
            key: 'services',
            children: (
                <ServiceCustomer
                    roomRentID={roomRentID}
                    newdataService={newdataService}
                    onGetService={onGetService}
                    services={services}
                />
            ),
        },
        {
            label: 'Thành viên',
            key: 'member',
            children: (
                <MemberCustomer
                    roomRentID={roomRentID}
                    newdataMember={newdataMember}
                    onGetMember={onGetMember}
                />
            ),
        },
        {
            label: 'Hợp đồng',
            key: 'contract',
            children: (
                <ContractCustomer
                    roomRentID={roomRentID}
                    form={form}
                    onSave={onSave}
                />
            ),
        },
    ];

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
                            onClick={handleSubmit}
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
                <Tabs activeKey={tab} onChange={setTab} items={items}></Tabs>
            </div>
        </div>
    );
};

export default CustomerRedirect;
